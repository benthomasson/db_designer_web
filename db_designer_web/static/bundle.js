(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"inherits":6}],2:[function(require,module,exports){
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
_State.prototype.mousePressed = function (controller) {
}
_State.prototype.mouseWheel = function (controller) {
}
_State.prototype.mouseDragged = function (controller) {
}
_State.prototype.mouseReleased = function (controller) {
}
_State.prototype.keyTyped = function (controller) {
}
_State.prototype.keyPressed = function (controller) {
    controller.next_controller.state.keyPressed(controller)
}
_State.prototype.keyReleased = function (controller) {
}
var State = new _State()
exports.State = State
exports._State = _State

function _Move () {
}
inherits(_Move, _State)

_Move.prototype.mouseReleased = function (controller) {
    controller.changeState(Selected)
}
_Move.prototype.mouseReleased.transitions = ['Selected']

var Move = new _Move()
exports.Move = Move

function _Edit () {
}
inherits(_Edit, _State)

_Edit.prototype.mouseDragged = function (controller) {
    controller.changeState(Move)
}
_Edit.prototype.mouseDragged.transitions = ['Move']

_Edit.prototype.keyTyped = function (controller) {
    controller.changeState(Selected)
}
_Edit.prototype.keyTyped.transitions = ['Selected']

_Edit.prototype.mousePressed = function (controller) {
    controller.changeState(Selected)

    controller.changeState(Ready)
}
_Edit.prototype.mousePressed.transitions = ['Selected', 'Ready']

_Edit.prototype.handle_special_keys = function (controller) {
    controller.changeState(Selected)
}
_Edit.prototype.handle_special_keys.transitions = ['Selected']

_Edit.prototype.keyPressed = function (controller) {
    controller.changeState(Selected)
}
_Edit.prototype.keyPressed.transitions = ['Selected']

var Edit = new _Edit()
exports.Edit = Edit

function _Ready () {
}
inherits(_Ready, _State)

_Ready.prototype.mousePressed = function (controller) {
    controller.application.select_item()
    if (controller.application.selected_property != null) {
        controller.changeState(EditProperty)
    } else {
        controller.next_controller.state.mousePressed(controller.next_controller)
    }
    // controller.changeState(SelectedColumn)

    // controller.changeState(SelectedForeignKey)

    // controller.changeState(Selected)
}
_Ready.prototype.mousePressed.transitions = ['SelectedColumn', 'SelectedForeignKey', 'Selected', 'EditProperty']

_Ready.prototype.mouseWheel = function (controller, event) {
    controller.next_controller.state.mouseWheel(controller.next_controller, event)
}

_Ready.prototype.mouseDragged = function (controller) {
    controller.next_controller.state.mouseDragged(controller.next_controller)
}

_Ready.prototype.mouseReleased = function (controller) {
    controller.next_controller.state.mouseReleased(controller.next_controller)
}

var Ready = new _Ready()
exports.Ready = Ready

function _Selected () {
}
inherits(_Selected, _State)

_Selected.prototype.mouseDragged = function (controller) {
    controller.changeState(Ready)

    controller.changeState(Move)
}
_Selected.prototype.mouseDragged.transitions = ['Ready', 'Move']

_Selected.prototype.mousePressed = function (controller) {
    controller.changeState(Ready)

    controller.changeState(Edit)
}
_Selected.prototype.mousePressed.transitions = ['Ready', 'Edit']

_Selected.prototype.keyPressed = function (controller) {
    controller.changeState(Ready)
}
_Selected.prototype.keyPressed.transitions = ['Ready']

var Selected = new _Selected()
exports.Selected = Selected

function _Start () {
}
inherits(_Start, _State)

_Start.prototype.start = function (controller) {
    controller.changeState(Ready)
}
_Start.prototype.start.transitions = ['Ready']

var Start = new _Start()
exports.Start = Start

function _SelectedForeignKey () {
}
inherits(_SelectedForeignKey, _State)

_SelectedForeignKey.prototype.mousePressed = function (controller) {
    controller.changeState(EditForeignKey)

    controller.changeState(Ready)
}
_SelectedForeignKey.prototype.mousePressed.transitions = ['EditForeignKey', 'Ready']

_SelectedForeignKey.prototype.keyPressed = function (controller) {
    controller.changeState(Ready)
}
_SelectedForeignKey.prototype.keyPressed.transitions = ['Ready']

var SelectedForeignKey = new _SelectedForeignKey()
exports.SelectedForeignKey = SelectedForeignKey

function _EditForeignKey () {
}
inherits(_EditForeignKey, _State)

_EditForeignKey.prototype.mousePressed = function (controller) {
    controller.changeState(Ready)
}
_EditForeignKey.prototype.mousePressed.transitions = ['Ready']

_EditForeignKey.prototype.handle_special_keys = function (controller) {
    controller.changeState(SelectedForeignKey)
}
_EditForeignKey.prototype.handle_special_keys.transitions = ['SelectedForeignKey']

_EditForeignKey.prototype.keyPressed = function (controller) {
    controller.changeState(SelectedForeignKey)
}
_EditForeignKey.prototype.keyPressed.transitions = ['SelectedForeignKey']

var EditForeignKey = new _EditForeignKey()
exports.EditForeignKey = EditForeignKey

function _EditColumn () {
}
inherits(_EditColumn, _State)

_EditColumn.prototype.mousePressed = function (controller) {
    controller.changeState(Ready)
}
_EditColumn.prototype.mousePressed.transitions = ['Ready']

_EditColumn.prototype.handle_special_keys = function (controller) {
    controller.changeState(SelectedColumn)
}
_EditColumn.prototype.handle_special_keys.transitions = ['SelectedColumn']

_EditColumn.prototype.keyPressed = function (controller) {
    controller.changeState(SelectedColumn)
}
_EditColumn.prototype.keyPressed.transitions = ['SelectedColumn']

var EditColumn = new _EditColumn()
exports.EditColumn = EditColumn

function _EditProperty () {
}
inherits(_EditProperty, _State)

_EditProperty.prototype.start = function (controller) {
    controller.application.selected_property.edit = true
}

_EditProperty.prototype.end = function (controller) {
    controller.application.selected_property.object[controller.application.selected_property.property] = controller.application.selected_property.label
    controller.application.selected_property.edit = false
    controller.application.selected_property.selected = false
    controller.application.selected_property = null
}

_EditProperty.prototype.keyTyped = function (controller) {
    if (this.handle_special_keys(controller)) {
        // do nothing
    } else {
        controller.application.selected_property.label += key
    }
}
_Edit.prototype.keyTyped.transitions = ['Selected']

_EditProperty.prototype.mousePressed = function (controller) {
    controller.changeState(Ready)
    controller.state.mousePressed(controller)
}
_EditProperty.prototype.mousePressed.transitions = ['Ready']

_EditProperty.prototype.handle_special_keys = function (controller) {
    if (keyCode === RETURN) {
        controller.changeState(Ready)
        return true
    } else if (keyCode === ENTER) {
        controller.changeState(Ready)
        return true
    } else if (keyCode === BACKSPACE) {
        controller.application.selected_property.label = controller.application.selected_property.label.substring(0, controller.application.selected_property.label.length - 1)
        return true
    } else if (keyCode === DELETE) {
        controller.application.selected_property.label = controller.application.selected_property.label.substring(0, controller.application.selected_property.label.length - 1)
        return true
    } else {
        return false
    }
}
_EditProperty.prototype.handle_special_keys.transitions = ['Ready']

_EditProperty.prototype.keyPressed = _EditProperty.prototype.handle_special_keys
_EditProperty.prototype.keyPressed.transitions = ['Ready']

var EditProperty = new _EditProperty()
exports.EditProperty = EditProperty

function _SelectedColumn () {
}
inherits(_SelectedColumn, _State)

_SelectedColumn.prototype.mousePressed = function (controller) {
    controller.changeState(Ready)

    controller.changeState(EditColumn)
}
_SelectedColumn.prototype.mousePressed.transitions = ['Ready', 'EditColumn']

_SelectedColumn.prototype.keyPressed = function (controller) {
    controller.changeState(Ready)
}
_SelectedColumn.prototype.keyPressed.transitions = ['Ready']

var SelectedColumn = new _SelectedColumn()
exports.SelectedColumn = SelectedColumn


},{"inherits":6}],3:[function(require,module,exports){
var fsm = require('./fsm.js')
exports.fsm = fsm
var models = require('./models.js')
exports.models = models
var widgets = require('./widgets.js')
exports.widgets = widgets

},{"./fsm.js":2,"./models.js":5,"./widgets.js":9}],4:[function(require,module,exports){
var inherits = require('inherits')
var models = require('./models.js')

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
    var new_table = new models.Table()
    new_table.x = controller.application.mousePX
    new_table.y = controller.application.mousePY
    new_table.name = controller.application.NewTablePointer.label
    controller.application.tables.push(new_table)

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


},{"./models.js":5,"inherits":6}],5:[function(require,module,exports){
var fsm = require('./fsm.js')
var settings = require('./settings.js')
var widgets = require('./widgets.js')
var view_fsm = require('./view_fsm.js')
var menu_fsm = require('./menu_fsm.js')

function Application () {
    this.main_controller = new fsm.Controller()
    this.main_controller.application = this
    this.main_controller.changeState(fsm.Start)
    this.view_controller = new view_fsm.Controller()
    this.view_controller.application = this
    this.view_controller.changeState(view_fsm.Start)
    var menu_controller = this.menu_controller = new menu_fsm.Controller()
    this.menu_controller.application = this
    this.menu_controller.changeState(menu_fsm.Start)
    this.menu_controller.next_controller = this.main_controller
    this.main_controller.next_controller = this.view_controller
    this.loop_count_down = 60
    this.db_to_load = null
    this.socket = null
    this.tables = []
    this.panX = 0
    this.panY = 0
    this.oldPanX = 0
    this.oldPanY = 0
    this.scaleXY = 1.0
    this.oldScaleXY = 0
    this.mousePressedX = 0
    this.mousePressedY = 0
    this.lastKeyCode = 0
    this.state = null
    this.wheel = null
    this.selected_state = null
    this.selected_transition = null
    this.selected_property = null
    this.debug = true
    this.show_menu = true
    this.show_pointer = true
    this.active_widgets = []
    this.properties = []
    this.model = null
    this.app = null
    this.directory = null
    this.NewTablePointer = new widgets.NewTablePointer()
    this.MoveMousePointer = new widgets.MoveMousePointer()
    this.MagnifyingGlassMousePointer = new widgets.MagnifyingGlassMousePointer()
    this.ArrowMousePointer = new widgets.ArrowMousePointer()
    this.pointer_count_down = null
    this.mousePointer = this.ArrowMousePointer

    var load_button = new widgets.Button()
    var save_button = new widgets.Button()
    var new_table_button = new widgets.Button()
    var new_fkey_button = new widgets.Button()
    this.bar = new widgets.ButtonBar()
    this.bar.buttons.push(load_button)
    this.bar.buttons.push(save_button)
    this.bar.buttons.push(new_table_button)
    this.bar.buttons.push(new_fkey_button)

    this.active_widgets.push(load_button)
    this.active_widgets.push(save_button)
    this.active_widgets.push(new_table_button)
    this.active_widgets.push(new_fkey_button)

    load_button.label = 'Load'
    save_button.label = 'Save'
    new_table_button.label = 'New Table'
    new_fkey_button.label = 'New Foreign Key'

    load_button.call_back = function () {
        menu_controller.state.load_button(menu_controller)
    }
    save_button.call_back = function () {
        menu_controller.state.save_button(menu_controller)
    }
    new_table_button.call_back = function () {
        menu_controller.state.new_table_button(menu_controller)
    }
    new_fkey_button.call_back = function () {
        menu_controller.state.new_fkey_button(menu_controller)
    }

    this.bar.x = 10
    this.bar.y = 60
    this.last_saved_url = null

    this.app_property_field = new widgets.TextField()
    this.app_property_field.x = 10
    this.app_property_field.y = 10
    this.app_property_field.label = 'db'
    this.app_property_field.object = this
    this.app_property_field.property = 'app'

    this.properties.push(this.app_property_field)
}

Application.prototype.remove_state = function (state) {
    var index = this.states.indexOf(state)
    if (index > -1) {
        this.states.splice(index, 1)
    }
    var i = 0
    var transition = null
    var transitions = this.transitions.slice(0)

    for (i = 0; i < transitions.length; i++) {
        transition = transitions[i]
        if (transition.to_state === state) {
            this.remove_transition(transition)
        }
        if (transition.from_state === state) {
            this.remove_transition(transition)
        }
    }
}

Application.prototype.remove_transition = function (transitions) {
    var index = this.transitions.indexOf(transitions)
    if (index > -1) {
        this.transitions.splice(index, 1)
    }
}

Application.prototype.get_state_by_name = function (name) {
    var i = 0
    var state = null

    for (i = 0; i < this.states.length; i++) {
        state = this.states[i]
        if (state.label === name) {
            return state
        }
    }

    return null
}

Application.prototype.load_db = function (db_to_load) {
    console.log(db_to_load)

    if (typeof db_to_load.panX !== 'undefined') {
        this.panX = db_to_load.panX
    }
    if (typeof db_to_load.panY !== 'undefined') {
        this.panY = db_to_load.panY
    }
    if (typeof db_to_load.scaleXY !== 'undefined') {
        this.scaleXY = db_to_load.scaleXY
    }

    if (typeof db_to_load.app !== 'undefined') {
        this.app = db_to_load.app
        this.app_property_field.label = db_to_load.app
    }
}

Application.prototype.on_saved = function (message) {
    this.menu_controller.state.on_saved(this.menu_controller, message)
}

Application.prototype.exportDB = function () {
    return {panX: this.panX,
            panY: this.panY,
            scaleXY: this.scaleXY,
            app: this.app === null ? 'db' : this.app }
}

Application.prototype.scaleAndPan = function () {
    translate(this.panX, this.panY)
    scale(this.scaleXY)
}

Application.prototype.select_item = function () {
    this.clear_selections()
    if (this.select_property()) {
        return true
    }
}

Application.prototype.clear_selections = function () {
    var i = 0
    var property = null
    for (i = 0; i < this.properties.length; i++) {
        property = this.properties[i]
        property.selected = false
    }
}

Application.prototype.select_property = function () {
    this.selected_property = null
    var i = 0
    var property = null
    for (i = 0; i < this.properties.length; i++) {
        property = this.properties[i]
        if (property.is_selected(this)) {
            property.selected = true
            this.selected_property = property
            return true
        } else {
            property.selected = false
        }
    }
    return false
}

Application.prototype.save = function (button) {
}

Application.prototype.load = function (button) {
}

Application.prototype.generate = function (button) {
}

Application.prototype.validate = function (button) {
}

Application.prototype.draw_content = function (controller) {
    var i = 0
    for (i = 0; i < this.tables.length; i ++) {
        this.tables[i].draw(controller)
    }
}

Application.prototype.draw_menus = function (controller) {
    if (this.show_menu) {
        this.bar.draw(controller)
        this.app_property_field.draw(controller)
    }
    if (this.debug) {
        var from_right = 20
        noStroke()
        fill(0)
        var fps_string = 'fps: ' + frameRate().toFixed(0)
        text(fps_string, width - (from_right * textSize()), textSize())
        text('main state:' + this.main_controller.state.constructor.name, width - (from_right * textSize()), textSize() * 2)
        text('menu state:' + this.menu_controller.state.constructor.name, width - (from_right * textSize()), textSize() * 3)
        text('view state:' + this.view_controller.state.constructor.name, width - (from_right * textSize()), textSize() * 4)
        text('pcd:' + this.pointer_count_down, width - (from_right * textSize()), textSize() * 5)
        text('X, Y:' + mouseX + ', ' + mouseY, width - (from_right * textSize()), textSize() * 6)
        text('PX, PY:' + this.mousePX + ', ' + this.mousePY, width - (from_right * textSize()), textSize() * 7)
        text('key:' + key, width - (from_right * textSize()), textSize() * 8)
        text('keyCode:' + keyCode, width - (from_right * textSize()), textSize() * 9)
        text('mp:' + this.mousePointer.constructor.name, width - (from_right * textSize()), textSize() * 10)
        text('panX, panY:' + this.panX + ', ' + this.panY, width - (from_right * textSize()), textSize() * 11)
        text('scaleXY:' + this.scaleXY, width - (from_right * textSize()), textSize() * 12)
        text('lcd:' + this.loop_count_down, width - (from_right * textSize()), textSize() * 13)
    }

    if (this.pointer_count_down === null) {
        // do nothing
    } else if (this.pointer_count_down <= 1) {
        this.view_controller.state.count_down_done(this.view_controller)
        this.mousePointer = this.ArrowMousePointer
        this.pointer_count_down = null
    } else {
        this.pointer_count_down -= 1
    }

    if (this.mousePointer && this.show_pointer) {
        this.mousePointer.draw(this)
    }

    var widget = null

    if (this.show_menu) {
        for (var i = 0; i < controller.active_widgets.length; i++) {
            widget = controller.active_widgets[i]
            if (mouseX > widget.left_extent() &&
                    mouseX < widget.right_extent() &&
                    mouseY > widget.top_extent() &&
                    mouseY < widget.bottom_extent()) {
                widget.mouseOver()
            } else {
                widget.mouseOut()
                widget.mouseReleased()
            }
        }
    }
}

Application.prototype.mouseWheel = function (event) {
    this.menu_controller.state.mouseWheel(this.menu_controller, event)
}
Application.prototype.mouseDragged = function () {
    this.menu_controller.state.mouseDragged(this.menu_controller)
}
Application.prototype.mousePressed = function () {
    this.menu_controller.state.mousePressed(this.menu_controller)
}
Application.prototype.mouseReleased = function () {
    this.menu_controller.state.mouseReleased(this.menu_controller)
}
Application.prototype.keyTyped = function () {
    this.menu_controller.state.keyTyped(this.menu_controller)
}
Application.prototype.keyPressed = function () {
    this.menu_controller.state.keyPressed(this.menu_controller)
}
Application.prototype.keyReleased = function () {
    this.menu_controller.state.keyReleased(this.menu_controller)
}
exports.Application = Application

function Table () {
    this.edit = false
    this.selected = false
    this.columns = []
    this.color = settings.FILL
    this.text_size = settings.TEXT_SIZE
    this.name = ''
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.full_height = 0
    this.external = false
    this.extra = false
    this.view = false
    this.natural_key = null
    this.natural_keys = []
    this.display = null
    this.ordering = []
}
Table.prototype.is_selected = function (controller) {
    return (controller.mousePX > this.left_extent() &&
            controller.mousePX < this.right_extent() &&
            controller.mousePY > this.top_extent() &&
            controller.mousePY < this.bottom_extent())
}
Table.prototype.add_empty_column = function () {
    var i = 0
    var all_names = true
    for (i = 0; i < this.columns.length; i++) {
        all_names = all_names && this.columns[i]
    }
    if (all_names) {
        this.columns.push(new Column(this))
    }
}
Table.prototype.left_title_extent = function () {
    return this.x
}

Table.prototype.right_title_extent = function () {
    return this.x + this.width
}

Table.prototype.top_title_extent = function () {
    return this.y
}

Table.prototype.bottom_title_extent = function () {
    return this.y + this.height
}

Table.prototype.left_extent = function () {
    return this.x
}

Table.prototype.right_extent = function () {
    return this.x + this.width
}

Table.prototype.top_extent = function () {
    return this.y
}

Table.prototype.bottom_extent = function () {
    return this.y + this.full_height
}

Table.prototype._calculate_width = function () {
    textSize(this.text_size)
    var width = textWidth(this.name)
    if (this.edit) {
        width += 1
    }
    return width + 20
}

Table.prototype._calculate_height = function () {
    return this.text_size + 30
}

Table.prototype.draw = function (controller) {
    strokeWeight(1)
    stroke(settings.COLOR)
    fill(this.color)
    this.width = this._calculate_width()
    this.height = this._calculate_height()
    //this.height = this.text_size + 30
    //this.width = textWidth(this.name) + 22
    rect(this.x, this.y, this.width, this.height)
    noStroke()
    fill(settings.TEXT_COLOR)
    textSize(this.text_size)
    text(this.name, this.x + 10, this.y + this.text_size + 10)
    return
    if (this.edit) {
        text(this.name + '_', this.x + 10, this.y + this.text_size + 10)
    } else {
        text(this.name, this.x + 10, this.y + this.text_size + 10)
    }
}

exports.Table = Table

function Column () {
    this.table = null
    this.connectors = []
    this.x = 0
    this.y = 0
    this.edit = false
    this.name = ''
    this.ref = null
    this.width = 100
    this.height = 100
    this.pk = false
    this.related_name = null
    this.text_size = settings.TEXT_SIZE
}

Column.prototype.is_selected = function (controller) {
    return (controller.mousePX > this.left_extent() &&
            controller.mousePX < this.right_extent() &&
            controller.mousePY > this.top_extent() &&
            controller.mousePY < this.bottom_extent())
}

Column.prototype.left_extent = function () {
    return this.x
}

Column.prototype.right_extent = function () {
    return this.x + this.width
}

Column.prototype.top_extent = function () {
    return this.y
}

Column.prototype.bottom_extent = function () {
    return this.y + this.height
}
exports.Column = Column

},{"./fsm.js":2,"./menu_fsm.js":4,"./settings.js":7,"./view_fsm.js":8,"./widgets.js":9}],6:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],7:[function(require,module,exports){
var TEXT_SIZE = 12
var SELECTED_COLOR = '#66FFFF'
var COLOR = '#333333'
var FILL = '#B9B9B9'
var TEXT_COLOR = '#5A5A5A'
exports.TEXT_SIZE = TEXT_SIZE
exports.SELECTED_COLOR = SELECTED_COLOR
exports.COLOR = COLOR
exports.FILL = FILL
exports.TEXT_COLOR = TEXT_COLOR

},{}],8:[function(require,module,exports){
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

},{"inherits":6}],9:[function(require,module,exports){
var inherits = require('inherits')
var settings = require('./settings.js')
var button_fsm = require('./button_fsm.js')

function arrow (x1, y1, x2, y2, arrow_offset, _label, _selected, _label_offset) {
    var label = (typeof _label !== 'undefined' ? _label : '')
    var selected = (typeof _selected !== 'undefined' ? _selected : false)
    var label_offset = (typeof _label_offset !== 'undefined' ? _label_offset : 0)
    if (selected) {
        strokeWeight(6)
        stroke(settings.SELECTED_COLOR)
        fill(0)
        line(x1, y1, x2, y2)
        push()
        translate(x2, y2)
        rotate(atan2(y2 - y1, x2 - x1))
        translate(-arrow_offset, 0)
        stroke(settings.SELECTED_COLOR)
        fill(settings.SELECTED_COLOR)
        triangle(4, 0, -12, 7, -12, -7)
        pop()
    }
    strokeWeight(2)
    stroke(settings.COLOR)
    fill(settings.COLOR)
    line(x1, y1, x2, y2)
    push()
    translate(x2, y2)
    rotate(atan2(y2 - y1, x2 - x1))
    push()
    translate(-arrow_offset, 0)
    stroke(settings.COLOR)
    fill(settings.COLOR)
    triangle(0, 0, -10, 5, -10, -5)
    pop()
    translate(-sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2)) / 2.0, 0)
    textSize(settings.TEXT_SIZE)
    noStroke()
    text(label, -textWidth(label) / 2, -(settings.TEXT_SIZE * 0.5) - settings.TEXT_SIZE * label_offset)
    pop()
}
exports.arrow = arrow

function Widget () {

}

Widget.prototype.mouseOver = function () {
}

Widget.prototype.mouseOut = function () {
}

Widget.prototype.mousePressed = function () {
}

Widget.prototype.mouseReleased = function () {
}

Widget.prototype.top_extent = function () {
    return 0
}
Widget.prototype.bottom_extent = function () {
    return 0
}
Widget.prototype.left_extent = function () {
    return 0
}
Widget.prototype.right_extent = function () {
    return 0
}

function Button (x, y, label, text_size, size, color, fill, pressed_color, call_back) {
    this.x = x
    this.y = y
    this.text_size = (typeof text_size !== 'undefined' ? text_size : 20)
    this.label = label
    this.color = (typeof color !== 'undefined' ? color : '#5A5A5A')
    this.fill = (typeof fill !== 'undefined' ? fill : '#B9B9B9')
    this.size = (typeof size !== 'undefined' ? size : 20)
    this.pressed_color = (typeof pressed_color !== 'undefined' ? pressed_color : '#7F7F7F')
    this.state = button_fsm.NotPressed
    this.pressed = false
    this.active = false
    this.call_back = (typeof call_back !== 'undefined' ? call_back : null)
}

inherits(Button, button_fsm.Controller)

Button.prototype.mouseOver = function () {
    this.active = true
}

Button.prototype.mouseOut = function () {
    this.active = false
    this.state.mouseOut(this)
}

Button.prototype.mousePressed = function () {
    this.state.mousePressed(this)
}

Button.prototype.mouseReleased = function () {
    this.state.mouseReleased(this)
}

Button.prototype.top_extent = function () {
    return this.y
}
Button.prototype.left_extent = function () {
    return this.x
}
Button.prototype.right_extent = function () {
    textSize(this.text_size)
    return this.x + textWidth(this.label) + this.size
}
Button.prototype.bottom_extent = function () {
    return this.y + this.size + this.text_size
}
Button.prototype.width = function () {
    return this.right_extent() - this.left_extent()
}
Button.prototype.height = function () {
    return this.bottom_extent() - this.top_extent()
}

Button.prototype.draw = function () {
    this.draw_button()
    this.draw_icon()
    this.draw_label()
}

Button.prototype.draw_button = function () {
    push()
    translate(this.x, this.y)
    if (this.active) {
        stroke(this.color)
    } else {
        stroke(this.fill)
    }
    if (this.pressed) {
        fill(this.pressed_color)
    } else {
        fill(this.fill)
    }
    textSize(this.text_size)
    rect(0, 0, this.width(), this.height(), this.size / 5)
    pop()
}
Button.prototype.draw_icon = function () {
}

Button.prototype.draw_label = function () {
    push()
    translate(this.x, this.y)
    translate((textWidth(this.label) + this.size) / 2,
              (this.size + this.text_size) / 2 - this.text_size / 4)
    textAlign(CENTER, CENTER)
    fill(this.color)
    text(this.label, 0, 0)
    pop()
    textAlign(LEFT, BASELINE)
}

exports.Button = Button
function button (x, y, label, text_size, size, color, fill) {
    return Button(x, y, label, text_size, size, color, fill).draw()
}
exports.button = button

function ButtonBar (buttons, x, y, size, color, fill, padding) {
    this.x = x
    this.x = (typeof x !== 'undefined' ? x : 0)
    this.y = (typeof y !== 'undefined' ? y : 0)
    this.size = (typeof size !== 'undefined' ? size : 50)
    this.color = (typeof color !== 'undefined' ? color : '#5A5A5A')
    this.fill = (typeof fill !== 'undefined' ? fill : '#B9B9B9')
    this.padding = (typeof padding !== 'undefined' ? padding : 5)
    this.buttons = []
    this.buttons.concat(buttons)
}

ButtonBar.prototype.draw = function () {
    strokeWeight(2)
    fill(this.fill)
    noStroke()
    var width = 0
    var i = 0
    var b = null
    for (i = 0; i < this.buttons.length; i++) {
        b = this.buttons[i]
        width += b.width()
    }
    rect(this.x, this.y, width + this.padding * (this.buttons.length + 1), this.size, this.size / 5)
    var x = this.x + this.padding
    var y = this.y + this.padding
    for (i = 0; i < this.buttons.length; i++) {
        b = this.buttons[i]
        b.x = x
        b.y = y
        b.draw()
        x += b.width() + this.padding
    }
}
exports.ButtonBar = ButtonBar

function MoveMousePointer (size, color) {
    this.size = (typeof size !== 'undefined' ? size : 20)
    this.color = (typeof color !== 'undefined' ? color : '#5A5A5A')
}

MoveMousePointer.prototype.draw = function () {
    var x = mouseX
    var y = mouseY
    strokeWeight(2)
    stroke(this.color)
    push()
    translate(x, y)
    for (var r = 0; r < 4; r++) {
        rotate(PI / 2)
        line(this.size / 2, 0, 0, 0)
        push()
        translate(this.size / 2, 0)
        fill(this.color)
        triangle(0, 0, -4, 2, -4, -2)
        pop()
    }
    pop()
}
exports.MoveMousePointer = MoveMousePointer

function MagnifyingGlassMousePointer (size, color) {
    this.size = (typeof size !== 'undefined' ? size : 20)
    this.color = (typeof color !== 'undefined' ? color : '#5A5A5A')
}

MagnifyingGlassMousePointer.prototype.draw = function () {
    var x = mouseX
    var y = mouseY
    strokeWeight(2)
    noFill()
    stroke(this.color)
    ellipse(x, y, this.size, this.size)
    push()
    translate(x, y)
    rotate(PI / 4)
    translate(this.size / 2, 0)
    line(this.size / 2, 0, 0, 0)
    pop()
    push()
    translate(x, y)
    rotate(PI / 2)
    for (var r = 0; r < 2; r++) {
        rotate(PI)
        push()
        translate(this.size, 0)
        line(this.size / 2, 0, 0, 0)
        translate(this.size / 2, 0)
        triangle(0, 0, -4, 2, -4, -2)
        pop()
    }
    pop()
}
exports.MagnifyingGlassMousePointer = MagnifyingGlassMousePointer

function ArrowMousePointer () {
    this.size = 20
    this.color = '#5A5A5A'
}

ArrowMousePointer.prototype.draw = function () {
    var x = mouseX
    var y = mouseY
    strokeWeight(2)
    noFill()
    stroke(this.color)
    push()
    translate(x, y)
    rotate(PI / 3)
    line(this.size, 0, 0, 0)
    triangle(0, 0, 6, -3, 6, 3)
    pop()
}
exports.ArrowMousePointer = ArrowMousePointer

function NewTablePointer () {
    this.size = 100
    this.label = 'New Table'
}

NewTablePointer.prototype.draw = function (application) {
    var x = mouseX
    var y = mouseY
    stroke(settings.COLOR)
    fill(settings.FILL)
    rect(x, y, this.size * application.scaleXY, (settings.TEXT_SIZE + 30)* application.scaleXY)
    noStroke()
    fill(settings.COLOR)
    textSize(settings.TEXT_SIZE * application.scaleXY)
    text(this.label, x + 10, y + (settings.TEXT_SIZE + 10) * application.scaleXY)
}
exports.NewTablePointer = NewTablePointer

function TextField (x, y, label, text_size, size, color, fill, pressed_color, call_back) {
    this.x = x
    this.y = y
    this.label = label
    this.text_size = (typeof text_size !== 'undefined' ? text_size : 20)
    this.size = (typeof size !== 'undefined' ? size : 20)
    this.color = (typeof color !== 'undefined' ? color : '#5A5A5A')
    this.fill = (typeof fill !== 'undefined' ? fill : '#B9B9B9')
    this.pressed_color = (typeof pressed_color !== 'undefined' ? pressed_color : '#7F7F7F')
    this.call_back = (typeof call_back !== 'undefined' ? call_back : null)
    this.state = button_fsm.NotPressed
    this.pressed = false
    this.active = false
    this.edit = false
    this.selected = false
    this.object = null
    this.property = null
}

inherits(TextField, Button)

TextField.prototype.right_extent = function () {
    textSize(this.text_size)
    return this.x + textWidth(this.label + (this.edit ? '_' : '')) + this.size
}

TextField.prototype.draw_button = function () {
    push()
    translate(this.x, this.y)
    if (this.selected) {
        stroke(settings.SELECTED_COLOR)
    } else {
        stroke(this.fill)
    }
    fill(this.fill)
    textSize(this.text_size)
    rect(0, 0, this.width(), this.height(), this.size / 5)
    pop()
}

TextField.prototype.draw_label = function () {
    push()
    translate(this.x, this.y)
    textSize(this.text_size)
    translate((textWidth(this.label) + this.size) / 2,
              (this.size + this.text_size) / 2 - this.text_size / 4)
    textAlign(CENTER, CENTER)
    fill(this.color)
    if (this.edit) {
        text(this.label + '_', 0, 0)
    } else {
        text(this.label, 0, 0)
    }
    pop()
    textAlign(LEFT, BASELINE)
}
TextField.prototype.is_selected = function (controller) {
    return ((this.top_extent() < mouseY) &&
            (this.bottom_extent() > mouseY) &&
            (this.left_extent() < mouseX) &&
            (this.right_extent() > mouseX))
}

exports.TextField = TextField

},{"./button_fsm.js":1,"./settings.js":7,"inherits":6}]},{},[3])(3)
});