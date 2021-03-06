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
    this.selected_table = null
    this.selected_column = null
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
    if (this.select_table()) {
        return true
    }
}

Application.prototype.clear_selections = function () {
    var i = 0
    var property = null
    var table = null
    for (i = 0; i < this.properties.length; i++) {
        property = this.properties[i]
        property.selected = false
    }
    for (i = 0; i < this.tables.length; i++) {
        table = this.tables[i]
        table.selected = false
    }
}

Application.prototype.select_table = function () {
    this.selected_table = null
    var i = 0
    var table = null
    for (i = 0; i < this.tables.length; i++) {
        table = this.tables[i]
        if (table.is_selected(this)) {
            console.log('selected table')
            table.selected = true
            this.selected_table = table
            return true
        } else {
            table.selected = false
        }
    }
    return false
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
    for (i = 0; i < this.tables.length; i++) {
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
    this.label = ''
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
    console.log(controller.mousePX)
    console.log(controller.mousePY)
    console.log(this.left_extent())
    console.log(this.right_extent())
    console.log(this.top_extent())
    console.log(this.bottom_extent())
    var selected = (controller.mousePX > this.left_extent() &&
                    controller.mousePX < this.right_extent() &&
                    controller.mousePY > this.top_extent() &&
                    controller.mousePY < this.bottom_extent())
    console.log(selected)
    return selected
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
    return this.y + this._calculate_height()
}

Table.prototype._calculate_width = function () {
    textSize(this.text_size)
    var width = textWidth(this.label)
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
    rect(this.x, this.y, this.width, this.height)
    noStroke()
    fill(settings.TEXT_COLOR)
    textSize(this.text_size)
    if (this.edit) {
        text(this.label + '_', this.x + 10, this.y + this.text_size + 10)
    } else {
        text(this.label, this.x + 10, this.y + this.text_size + 10)
    }

    if (this.selected) {
        strokeWeight(2)
        noFill()
        stroke('#66FFFF')
        rect(this.x, this.y, this.width, this.height)
        strokeWeight(1)
        stroke(0)
    }
}

exports.Table = Table

function Column () {
    this.table = null
    this.connectors = []
    this.x = 0
    this.y = 0
    this.edit = false
    this.label = ''
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
