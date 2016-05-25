(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    controller.changeState(NotPressed)
}
_Clicked.prototype.start.transitions = ['NotPressed']

var Clicked = new _Clicked()
exports.Clicked = Clicked

function _Pressed () {
}
inherits(_Pressed, _State)

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
    _State.prototype.start = function (controller) {
    }
    _State.prototype.end = function (controller) {
    }
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

    controller.changeState(SelectedColumn)

    controller.changeState(SelectedForeignKey)

    controller.changeState(Selected)

    controller.changeState(EditProperty)
}
_Ready.prototype.mousePressed.transitions = ['SelectedColumn', 'SelectedForeignKey', 'Selected', 'EditProperty']

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

_EditProperty.prototype.mousePressed = function (controller) {

    controller.changeState(Ready)
}
_EditProperty.prototype.mousePressed.transitions = ['Ready']

_EditProperty.prototype.handle_special_keys = function (controller) {

    controller.changeState(Ready)
}
_EditProperty.prototype.handle_special_keys.transitions = ['Ready']

_EditProperty.prototype.keyPressed = function (controller) {

    controller.changeState(Ready)
}
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

var MenuReady = new _MenuReady()
exports.MenuReady = MenuReady

function _NewTable () {
}
inherits(_NewTable, _State)

_NewTable.prototype.mousePressed = function (controller) {

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

_Save.prototype.on_saved = function (controller) {

    controller.changeState(Saved)
}
_Save.prototype.on_saved.transitions = ['Saved']

var Save = new _Save()
exports.Save = Save

function _Saved () {
}
inherits(_Saved, _State)

_Saved.prototype.start = function (controller) {

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


},{"inherits":6}],5:[function(require,module,exports){
var fsm = require('./fsm.js')
var settings = require('./settings.js')
var widgets = require('./widgets.js')
var view_fsm = require('./view_fsm.js')
var menu_fsm = require('./menu_fsm.js')

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
exports.TEXT_SIZE = TEXT_SIZE
exports.SELECTED_COLOR = SELECTED_COLOR
exports.COLOR = COLOR
exports.FILL = FILL

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

function NewStatePointer () {
    this.size = 100
    this.label = 'New'
}

NewStatePointer.prototype.draw = function (application) {
    var x = mouseX
    var y = mouseY
    stroke(settings.COLOR)
    fill(settings.FILL)
    ellipse(x, y, this.size * application.scaleXY, this.size * application.scaleXY)
    noStroke()
    fill(settings.COLOR)
    textSize(settings.TEXT_SIZE * application.scaleXY)
    text(this.label, x - textWidth(this.label) / 2, y)
}
exports.NewStatePointer = NewStatePointer

function NewTransitionPointer () {
    this.size = 40
    this.color = '#5A5A5A'
}

NewTransitionPointer.prototype.draw = function (application) {
    var x = mouseX
    var y = mouseY
    strokeWeight(2)
    noFill()
    stroke(this.color)
    push()
    translate(x, y)
    rotate(2 * PI / 3)
    line(this.size, 0, 0, 0)
    pop()
    push()
    translate(x, y)
    line(-this.size / 5, 0, this.size / 5, 0)
    line(0, -this.size / 5, 0, this.size / 5)
    pop()
}
exports.NewTransitionPointer = NewTransitionPointer

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