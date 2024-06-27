function moveUp() {
    stopMoveDown()
    moveUpAnimation.start()
}

function moveDown() {
    stopMoveUp()
    moveDownAnimation.start()
}

function moveLeft() {
    stopMoveRight()
    moveLeftAnimation.start()
}

function moveRight() {
    stopMoveLeft()
    moveRightAnimation.start()
}

function stopMoveLeft() {
    moveLeftAnimation.stop()
}
function stopMoveRight() {
    moveRightAnimation.stop()
}
function stopMoveUp() {
    moveUpAnimation.stop()
}
function stopMoveDown() {
    moveDownAnimation.stop()
}

function collisionsDetect(dir) {
    if (dir === 'left' || dir === 'right') {
        stopMoveLeft()
        stopMoveRight()
    } else if (dir === 'up' || dir === 'down') {
        stopMoveUp()
        stopMoveDown()
    }
    collisionDetectScript.sendMessage({
                                          "entityX": collider.x,
                                          "entityY": collider.y,
                                          "entityHeight": collider.height,
                                          "entityWidth": collider.width,
                                          "index": entity.index,
                                          "model": colliderModel,
                                          "noClip": noClip,
                                          "posX": entity.posX,
                                          "posY": entity.posY,
                                          "direction": dir,
                                          "distance": distance,
                                          "duration": baseAnimationDuration
                                      })
}

function collisionsDetectMessage(messageObject) {
    const direction = messageObject.direction

    if (direction === "up") {
        deltaY = messageObject.deltaY
        durationY = messageObject.durationY
        moveUp()
    } else if (direction === "down") {
        deltaY = messageObject.deltaY
        durationY = messageObject.durationY
        moveDown()
    } else if (direction === "left") {
        deltaX = messageObject.deltaX
        durationX = messageObject.durationX
        moveLeft()
    } else if (direction === "right") {
        deltaX = messageObject.deltaX
        durationX = messageObject.durationX
        moveRight()
    }
}
