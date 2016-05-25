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

