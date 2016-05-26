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
}
_State.prototype.start = function (controller) {
}
_State.prototype.end = function (controller) {
}
_State.prototype.mouseReleased = function (controller) {
}
_State.prototype.mousePressed = function (controller) {
}
_State.prototype.count_down_done = function (controller) {
}
_State.prototype.mouseWheel = function (controller) {
}
var State = new _State()
exports.State = State
exports._State = _State

function _Start () {
}
inherits(_Start, _State)
var Start = new _Start()

_Start.prototype.start = function (controller) {
    controller.changeState(ViewReady)
}
_Start.prototype.start.transitions = ['ViewReady']
exports.Start = Start

function _ViewReady () {
}
inherits(_ViewReady, _State)

var ViewReady = new _ViewReady()

_ViewReady.prototype.mouseDragged = function (controller) {
    controller.changeState(Pan)
    controller.state.mouseDragged(controller)
}
_ViewReady.prototype.mouseDragged.transitions = ['Pan']

_ViewReady.prototype.mouseWheel = function (controller, event) {
    controller.changeState(Scale)
    controller.state.mouseWheel(controller, event)
}
_ViewReady.prototype.keyPressed = function (controller) {
    console.log(key)
    if (key === 'D') {
        controller.application.debug = !controller.application.debug
    }
    if (key === 'M') {
        controller.application.show_menu = !controller.application.show_menu
    }
    if (key === 'P') {
        controller.application.show_pointer = !controller.application.show_pointer
    }
}
_ViewReady.prototype.mouseWheel.transitions = ['Scale']
exports.ViewReady = ViewReady

function _Pan () {
}
inherits(_Pan, _State)

var Pan = new _Pan()

_Pan.prototype.start = function (controller) {
    controller.application.mousePointer = controller.application.MoveMousePointer
    controller.application.mousePressedX = mouseX
    controller.application.mousePressedY = mouseY
    controller.application.oldPanX = controller.application.panX
    controller.application.oldPanY = controller.application.panY
    controller.application.pointer_count_down = Math.floor(frameRate() / 2)
}

_Pan.prototype.end = function (controller) {
    controller.application.mousePointer = controller.application.ArrowMousePointer
}

_Pan.prototype.mousePressed = function (controller) {
    controller.application.mousePointer = controller.application.MoveMousePointer
    controller.application.mousePressedX = mouseX
    controller.application.mousePressedY = mouseY
    controller.application.oldPanX = controller.application.panX
    controller.application.oldPanY = controller.application.panY
    controller.application.pointer_count_down = Math.floor(frameRate() / 2)
}

_Pan.prototype.mouseDragged = function (controller) {
    controller.application.panX = (mouseX - controller.application.mousePressedX) + controller.application.oldPanX
    controller.application.panY = (mouseY - controller.application.mousePressedY) + controller.application.oldPanY
    controller.application.pointer_count_down = Math.floor(frameRate() / 2)
}

_Pan.prototype.mouseWheel = function (controller, event) {
    controller.changeState(ViewReady)
    controller.state.mouseWheel(controller, event)
}
_Pan.prototype.mouseWheel.transitions = ['ViewReady']

_Pan.prototype.count_down_done = function (controller) {
    controller.changeState(ViewReady)
}
_Pan.prototype.count_down_done.transitions = ['ViewReady']
exports.Pan = Pan

function _Scale () {
}
inherits(_Scale, _State)

_Scale.prototype.start = function (controller) {
    controller.application.mousePointer = controller.application.MagnifyingGlassMousePointer
}

_Scale.prototype.end = function (controller) {
    controller.application.mousePointer = controller.application.ArrowMousePointer
}

_Scale.prototype.mouseWheel = function (controller, event) {
    controller.application.mousePointer = controller.application.MagnifyingGlassMousePointer
    controller.application.pointer_count_down = Math.floor(frameRate() / 2)
    var delta = event.delta / 100
    controller.application.scaleXY = controller.application.scaleXY + delta
    if (controller.application.scaleXY < 0.2) {
        controller.application.scaleXY = 0.2
    }
    if (controller.application.scaleXY > 10) {
        controller.application.scaleXY = 10
    }
    controller.application.panX = mouseX - controller.application.scaleXY * controller.application.mousePX
    controller.application.panY = mouseY - controller.application.scaleXY * controller.application.mousePY
}
_Scale.prototype.mouseDragged = function (controller) {
    controller.changeState(ViewReady)
    controller.state.mouseDragged(controller)
}
_Scale.prototype.mouseDragged.transitions = ['ViewReady']
_Scale.prototype.count_down_done = function (controller) {
    controller.changeState(ViewReady)
}
_Scale.prototype.count_down_done.transitions = ['ViewReady']

var Scale = new _Scale()
exports.Scale = Scale
