/* global main */
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
}

function draw () {
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
}

function windowResized () {
    resizeCanvas(windowWidth, windowHeight)
}

function mouseWheel (event) {
    application.mouseWheel(event)
    return false
}

function mousePressed () {
    application.mousePressed()
    return false
}

function mouseReleased () {
    application.mouseReleased()
}

function mouseDragged () {
    application.mouseDragged()
    return false
}

function keyTyped () {
    try {
        application.keyTyped()
    } catch (err) {
        console.log(err)
    }
    return false
}

function keyPressed () {
    try {
        application.keyPressed()
    } catch (err) {
        console.log(err)
    }
    // Prevent Chrome from using backspace for go to the last page.
    if (keyCode === BACKSPACE) {
        return false
    }
}

function keyReleased () {
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
}())
