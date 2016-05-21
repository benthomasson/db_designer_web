#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

if sys.argv[-1] == 'publish':
    os.system('python setup.py sdist upload')
    sys.exit()

readme = open('README.rst').read()
history = open('HISTORY.rst').read().replace('.. :changelog:', '')

setup(
    name='db_designer_web',
    version='0.1.0',
    description='A p5js implementation ofof an interactive UI for designing database schemas.',
    long_description=readme + '\n\n' + history,
    author='Ben Thomasson',
    author_email='ben.thomasson@gmail.com',
    url='https://github.com/benthomasson/db_designer_web',
    packages=[
        'db_designer_web',
    ],
    package_dir={'db_designer_web': 'db_designer_web'},
    include_package_data=True,
    install_requires=[
    ],
    license="BSD",
    zip_safe=False,
    keywords='db_designer_web',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        "Programming Language :: Python :: 2",
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
    ],
    test_suite='tests',
)
