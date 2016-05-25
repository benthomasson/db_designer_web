var inherits = require('inherits')

function Controller () {
    this.state = null

}
exports.Controller = Controller

Controller.prototype.changeState = function (state) {
    console.log('changeState: ' + state.constructor.name)
    if (this.state != null) {
        this.state.end(this)
    }
    this.state = state
    if (this.state != null) {
        this.state.start(this)
    }
}
function _State () {
    _State.prototype.start = function (controller) {
    }
    _State.prototype.end = function (controller) {
    }
}
var State = new _State()
exports.State = State
exports._State = _State

function _Start () {
}
inherits(_Start, _State)

_Start.prototype.start = function (controller) {

    controller.changeState(ViewReady)
}
_Start.prototype.start.transitions = ['ViewReady']

var Start = new _Start()
exports.Start = Start

function _Scale () {
}
inherits(_Scale, _State)

_Scale.prototype.count_down_done = function (controller) {

    controller.changeState(ViewReady)
}
_Scale.prototype.count_down_done.transitions = ['ViewReady']

_Scale.prototype.mouseDragged = function (controller) {

    controller.changeState(ViewReady)
}
_Scale.prototype.mouseDragged.transitions = ['ViewReady']

var Scale = new _Scale()
exports.Scale = Scale

function _Pan () {
}
inherits(_Pan, _State)

_Pan.prototype.count_down_done = function (controller) {

    controller.changeState(ViewReady)
}
_Pan.prototype.count_down_done.transitions = ['ViewReady']

_Pan.prototype.mouseWheel = function (controller) {

    controller.changeState(ViewReady)
}
_Pan.prototype.mouseWheel.transitions = ['ViewReady']

var Pan = new _Pan()
exports.Pan = Pan

function _ViewReady () {
}
inherits(_ViewReady, _State)

_ViewReady.prototype.mouseWheel = function (controller) {

    controller.changeState(Scale)
}
_ViewReady.prototype.mouseWheel.transitions = ['Scale']

_ViewReady.prototype.mouseDragged = function (controller) {

    controller.changeState(Pan)
}
_ViewReady.prototype.mouseDragged.transitions = ['Pan']

var ViewReady = new _ViewReady()
exports.ViewReady = ViewReady

