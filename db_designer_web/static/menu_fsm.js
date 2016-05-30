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

function _Load () {
}
inherits(_Load, _State)

_Load.prototype.start = function (controller) {
    window.open('/static/upload.html', '_self')
    controller.changeState(MenuReady)
}
_Load.prototype.start.transitions = ['MenuReady']

var Load = new _Load()
exports.Load = Load

function _NewColumn () {
}
inherits(_NewColumn, _State)

_NewColumn.prototype.mousePressed = function (controller) {
    controller.changeState(MenuReady)
}
_NewColumn.prototype.mousePressed.transitions = ['MenuReady']

var NewColumn = new _NewColumn()
exports.NewColumn = NewColumn

function _NewForeignKey () {
}
inherits(_NewForeignKey, _State)

_NewForeignKey.prototype.mousePressed = function (controller) {
    controller.changeState(ConnectForeignKey)
    controller.changeState(MenuReady)
}
_NewForeignKey.prototype.mousePressed.transitions = ['ConnectForeignKey', 'MenuReady']

var NewForeignKey = new _NewForeignKey()
exports.NewForeignKey = NewForeignKey

function _MenuReady () {
}
inherits(_MenuReady, _State)

_MenuReady.prototype.new_foreign_key_button = function (controller) {
    controller.changeState(NewForeignKey)
}
_MenuReady.prototype.new_foreign_key_button.transitions = ['NewForeignKey']

_MenuReady.prototype.save_button = function (controller) {
    controller.changeState(Save)
}
_MenuReady.prototype.save_button.transitions = ['Save']

_MenuReady.prototype.new_table_button = function (controller) {
    controller.changeState(NewTable)
}
_MenuReady.prototype.new_table_button.transitions = ['NewTable']

_MenuReady.prototype.load_button = function (controller) {
    controller.changeState(Load)
}
_MenuReady.prototype.load_button.transitions = ['Load']

_MenuReady.prototype.new_column_button = function (controller) {
    controller.changeState(NewColumn)
}
_MenuReady.prototype.new_column_button.transitions = ['NewColumn']

_MenuReady.prototype.mousePressed = function (controller) {
    var widget = null
    if (controller.application.show_menu) {
        for (var i = 0; i < controller.application.active_widgets.length; i++) {
            widget = controller.application.active_widgets[i]
            if (mouseX > widget.left_extent() &&
                    mouseX < widget.right_extent() &&
                    mouseY > widget.top_extent() &&
                    mouseY < widget.bottom_extent()) {
                widget.mousePressed()
                return
            }
        }
    }
    controller.next_controller.state.mousePressed(controller.next_controller)
}

_MenuReady.prototype.mouseReleased = function (controller) {
    var widget = null
    if (controller.application.show_menu) {
        for (var i = 0; i < controller.application.active_widgets.length; i++) {
            widget = controller.application.active_widgets[i]
            if (mouseX > widget.left_extent() &&
                    mouseX < widget.right_extent() &&
                    mouseY > widget.top_extent() &&
                    mouseY < widget.bottom_extent()) {
                widget.mouseReleased()
            }
        }
    }
    controller.next_controller.state.mouseReleased(controller.next_controller)
}

_MenuReady.prototype.mouseWheel = function (controller, event) {
    controller.next_controller.state.mouseWheel(controller.next_controller, event)
}
_MenuReady.prototype.mouseDragged = function (controller) {
    controller.next_controller.state.mouseDragged(controller.next_controller)
}
_MenuReady.prototype.keyTyped = function (controller) {
    controller.next_controller.state.keyTyped(controller.next_controller)
}
_MenuReady.prototype.keyPressed = function (controller) {
    controller.next_controller.state.keyPressed(controller.next_controller)
}
_MenuReady.prototype.keyReleased = function (controller) {
    controller.next_controller.state.keyReleased(controller.next_controller)
}

var MenuReady = new _MenuReady()
exports.MenuReady = MenuReady

function _NewTable () {
}
inherits(_NewTable, _State)

_NewTable.prototype.start = function (controller) {
    controller.application.mousePointer = controller.application.NewTablePointer
}

_NewTable.prototype.mousePressed = function (controller) {
    controller.application.mousePointer = controller.application.ArrowMousePointer

    controller.changeState(MenuReady)
}
_NewTable.prototype.mousePressed.transitions = ['MenuReady']

var NewTable = new _NewTable()
exports.NewTable = NewTable

function _Start () {
}
inherits(_Start, _State)

_Start.prototype.start = function (controller) {
    controller.changeState(MenuReady)
}
_Start.prototype.start.transitions = ['MenuReady']

var Start = new _Start()
exports.Start = Start

function _Save () {
}
inherits(_Save, _State)

_Save.prototype.start = function (controller) {
    console.log(controller.application.exportDB())
    controller.application.socket.emit('save', controller.application.exportDB())
}

_Save.prototype.on_saved = function (controller, message) {
    console.log(message)
    controller.application.last_saved_url = message.url
    controller.changeState(Saved)
}
_Save.prototype.on_saved.transitions = ['Saved']

var Save = new _Save()
exports.Save = Save

function _Saved () {
}
inherits(_Saved, _State)

_Saved.prototype.start = function (controller) {
    if (controller.application.last_saved_url != null) {
        window.open(controller.application.last_saved_url)
        controller.application.last_saved_url = null
    }
    controller.changeState(MenuReady)
}
_Saved.prototype.start.transitions = ['MenuReady']

var Saved = new _Saved()
exports.Saved = Saved

function _ConnectForeignKey () {
}
inherits(_ConnectForeignKey, _State)

_ConnectForeignKey.prototype.mousePressed = function (controller) {
    controller.changeState(MenuReady)
}
_ConnectForeignKey.prototype.mousePressed.transitions = ['MenuReady']

var ConnectForeignKey = new _ConnectForeignKey()
exports.ConnectForeignKey = ConnectForeignKey

