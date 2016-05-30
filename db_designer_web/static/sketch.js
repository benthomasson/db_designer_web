/* global main db_to_load*/
console.log(main)

var application = new main.models.Application()
var socket = io.connect('/db-designer')
application.socket = socket

socket.on('saved', function (message) {
    application.on_saved(message)
})

function setup () {
    createCanvas(windowWidth, windowHeight)
    noCursor()
    application.db_to_load = db_to_load
}

function draw () {
    if (application.db_to_load) {
        application.load_db(db_to_load)
        application.db_to_load = null
    }
    clear()
    push()
    application.mousePX = (mouseX - application.panX) / application.scaleXY
    application.mousePY = (mouseY - application.panY) / application.scaleXY
    translate(application.panX, application.panY)
    scale(application.scaleXY)
    background(255)
    fill(255)
    application.draw_content(application)
    pop()
    application.draw_menus(application)
    if (application.debug) {
        stroke('yellow')
        line(mouseX - 10, mouseY, mouseX + 10, mouseY)
        line(mouseX, mouseY - 10, mouseX, mouseY + 10)
        stroke('#66FFFF')
        line(pmouseX - 10, pmouseY, pmouseX + 10, pmouseY)
        line(pmouseX, pmouseY - 10, pmouseX, pmouseY + 10)

        translate(application.panX, application.panY)
        scale(application.scaleXY)

        stroke('red')
        line(application.mousePX - 10, application.mousePY, application.mousePX + 10, application.mousePY)
        line(application.mousePX, application.mousePY - 10, application.mousePX, application.mousePY + 10)
    }
    if (application.loop_count_down < 0) {
        noLoop()
        application.loop_count_down = 60
    } else {
        application.loop_count_down += -1
    }
}

function windowResized () {
    loop()
    resizeCanvas(windowWidth, windowHeight)
}

function mouseWheel (event) {
    loop()
    application.mouseWheel(event)
    return false
}

function mousePressed () {
    loop()
    application.mousePressed()
    return false
}

function mouseReleased () {
    loop()
    application.mouseReleased()
}

function mouseMoved () {
    loop()
    return false
}

function mouseDragged () {
    loop()
    application.mouseDragged()
    return false
}

function keyTyped () {
    loop()
    try {
        application.keyTyped()
    } catch (err) {
        console.log(err)
    }
    return false
}

function keyPressed () {
    loop()
    try {
        application.keyPressed()
    } catch (err) {
        console.log(err)
    }
    // Prevent Chrome from using backspace to go to the last page.
    if (keyCode === BACKSPACE) {
        return false
    }
}

function keyReleased () {
    loop()
    application.keyReleased()
}

!(function () {
    this.draw = draw
    this.setup = setup
    this.windowResized = windowResized
    this.mouseWheel = mouseWheel
    this.mousePressed = mousePressed
    this.mouseReleased = mouseReleased
    this.mouseDragged = mouseDragged
    this.socket = socket
    this.keyTyped = keyTyped
    this.keyPressed = keyPressed
    this.keyReleased = keyReleased
    this.mouseMoved = mouseMoved
}())
