var inherits = require('inherits')

function Controller () {
    this.state = null
    this.call_back = null
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
}
_State.prototype.start = function (controller) {
}
_State.prototype.end = function (controller) {
}
_State.prototype.mouseOut = function (controller) {
}
_State.prototype.mouseOver = function (controller) {
}
_State.prototype.mousePressed = function (controller) {
}
_State.prototype.mouseReleased = function (controller) {
}
var State = new _State()
exports.State = State
exports._State = _State

function _NotPressed () {
}
inherits(_NotPressed, _State)

_NotPressed.prototype.mousePressed = function (controller) {
    controller.changeState(Pressed)
}
_NotPressed.prototype.mousePressed.transitions = ['Pressed']

var NotPressed = new _NotPressed()
exports.NotPressed = NotPressed

function _Clicked () {
}
inherits(_Clicked, _State)

_Clicked.prototype.start = function (controller) {
    if (controller.call_back) {
        controller.call_back(controller)
    }
    controller.changeState(NotPressed)
}
_Clicked.prototype.start.transitions = ['NotPressed']

var Clicked = new _Clicked()
exports.Clicked = Clicked

function _Pressed () {
}
inherits(_Pressed, _State)

_Pressed.prototype.start = function (controller) {
    controller.pressed = true
}
_Pressed.prototype.end = function (controller) {
    controller.pressed = false
}

_Pressed.prototype.mouseReleased = function (controller) {
    controller.changeState(Clicked)
}
_Pressed.prototype.mouseReleased.transitions = ['Clicked']

_Pressed.prototype.mouseOut = function (controller) {
    controller.changeState(NotPressed)
}
_Pressed.prototype.mouseOut.transitions = ['NotPressed']

var Pressed = new _Pressed()
exports.Pressed = Pressed

