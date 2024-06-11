import QtQuick

Rectangle {
    id: entity
    property double deltaX: 0
    property double deltaY: 0
    height: 1 / 11 * window.height
    width: height

    SequentialAnimation {
        id: verticalAnimation
        PropertyAnimation {
            target: entity
            property: "y"
            to: entity.y + deltaY
            duration: 250
        }
        // onFinished: deltaY = 0
    }
    SequentialAnimation {
        id: horizontalAnimation
        PropertyAnimation {
            target: entity
            property: "x"
            to: entity.x + deltaX
            duration: 250
        }
        // onFinished: deltaX = 0
    }

    function moveUp() {
        deltaY = -50
        verticalAnimation.running = true
    }

    function moveDown() {
        deltaY = +50
        verticalAnimation.running = true
    }

    function moveLeft() {
        deltaX = -50
        horizontalAnimation.running = true
    }

    function moveRight() {
        deltaX = +50
        horizontalAnimation.running = true
    }

    function stopHorizontalMove() {
        deltaX = 0
        // horizontalAnimation.stop()
    }

    function stopVerticalMove() {
        deltaY = 0
        // verticalAnimation.stop()
    }
}
