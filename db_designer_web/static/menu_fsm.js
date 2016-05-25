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

