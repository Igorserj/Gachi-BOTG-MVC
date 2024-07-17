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

function collisionsDetectMessage(messageObject) {
    const direction = messageObject.direction

    if (direction === "up") {
        moveUp()
    } else if (direction === "down") {
        moveDown()
    } else if (direction === "left") {
        moveLeft()
    } else if (direction === "right") {
        moveRight()
    }
}

function interact() {
    interactionDetectScript.sendMessage({
                                          "entityX": collider.x,
                                          "entityY": collider.y,
                                          "entityHeight": collider.height,
                                          "entityWidth": collider.width,
                                          "index": entity.entityIndex,
                                          "model": colliderModel,
                                          "posX": entity.posX,
                                          "posY": entity.posY,
                                          "distance": distance
                                      })
}

function interactionDetectMessage(messageObject) {
    const indices = messageObject.indices
    if (indices.length > 1) {
        for (let i = 0; i < indices.length; ++i) {
            console.log(colliderModel.get(indices[i]).type)
        }
    } else {
        colliderModel.get(indices[0]).item.parent.active = true
    }
}
