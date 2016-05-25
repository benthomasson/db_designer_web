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
