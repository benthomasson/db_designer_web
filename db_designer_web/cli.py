'''
Usage:
    db-designer-web [options]
    db-designer-web [options] start
    db-designer-web [options] status
    db-designer-web [options] stop
    db-designer-web [options] kill

Options:
    -h, --help              Show this page.
    -p=<p>, --port=<p>      Web TCP port for web server [default: 8887].
    --debug                 Show debug logging
    --tracebacks            Show tracebacks
    --foreground            Run in the foreground
'''


import gevent

from gevent import monkey
monkey.patch_all()


import signal
import os
import sys
from docopt import docopt
import logging
from bottle import run
import daemon
import psutil
from lockfile import pidlockfile
from daemon.pidfile import TimeoutPIDLockFile
from contextlib import contextmanager
from server import SocketIOServer

logger = logging.getLogger('db_designer_web.cli')

LOG_FILE = 'db-designer.log'
PID_FILE = 'db-designer.pid'


@contextmanager
def NullContext():
    yield


threads = []


def server_main(web_port):
    threads.append(gevent.spawn(run, server=SocketIOServer, host='0.0.0.0', port=web_port))
    gevent.joinall(threads)
    logging.warning('All threads completed')


def terminate(signal_number, stack_frame):
    logger.info('Terminating due to signal %s', signal_number)
    logger.debug('Killing all greenlets')
    gevent.killall(threads)
    logger.debug('Raising SystemExit')
    raise SystemExit()


def main(args=None):
    if args is None:
        args = sys.argv[1:]
    parsed_args = docopt(__doc__, args)
    if parsed_args['--debug']:
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.INFO)
    logger.debug("Debugging enabled")
    logger.debug(parsed_args)
    if parsed_args['status']:
        pid = pidlockfile.read_pid_from_pidfile(PID_FILE)
        if pid:
            logger.debug("Pid is %s", pid)
            p = psutil.Process(pid)
            if not p.is_running():
                logger.warning("db-designer not running")
                return 0
            else:
                logger.info("db-designer is running")
                return 0
        else:
            logger.warning("db-designer not running")
            return 1
    if parsed_args['stop']:
        pid = pidlockfile.read_pid_from_pidfile(PID_FILE)
        if pid:
            logger.debug("Sending terminate to %s", pid)
            os.kill(pid, signal.SIGTERM)
        else:
            logger.warning("db-designer not running")
        return
    elif parsed_args['kill']:
        pid = pidlockfile.read_pid_from_pidfile(PID_FILE)
        logger.debug("Sending kill to %s", pid)
        os.kill(pid, signal.SIGKILL)
        return
    elif parsed_args['--foreground']:
        context = NullContext()
        with context:
            server_main(int(parsed_args['--port']))
    else:
        log_file = open(LOG_FILE, 'a')
        pid_file = TimeoutPIDLockFile(PID_FILE, 1)
        context = daemon.DaemonContext(pidfile=pid_file,
                                       stdout=log_file,
                                       stderr=log_file,
                                       files_preserve=range(10),
                                       signal_map={signal.SIGTSTP: None,
                                                   signal.SIGTTIN: None,
                                                   signal.SIGTTOU: None,
                                                   signal.SIGINT: terminate,
                                                   signal.SIGTERM: terminate,
                                                   signal.SIGHUP: terminate,
                                                   signal.SIGUSR1: terminate,
                                                   signal.SIGUSR2: terminate})
        with context:
            server_main(int(parsed_args['--port']))
