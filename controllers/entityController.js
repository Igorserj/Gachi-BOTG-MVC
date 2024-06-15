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
    // cycleMoveLeftAnimation.stop()
}
function stopMoveRight() {
    moveRightAnimation.stop()
    // cycleMoveRightAnimation.stop()
}
function stopMoveUp() {
    moveUpAnimation.stop()
    // cycleMoveUpAnimation.stop()
}
function stopMoveDown() {
    moveDownAnimation.stop()
    // cycleMoveDownAnimation.stop()
}

function collisionsDetect(dir) {
    collisionDetectScript.sendMessage({
                                          "entityX": collider.x,
                                          "entityY": collider.y,
                                          "entityHeight": collider.height,
                                          "entityWidth": collider.width,
                                          "index": entity.index,
                                          "model": colliderModel,
                                          "direction": dir,
                                          "distance": distance,
                                          "duration": baseAnimationDuration
                                      })
}
