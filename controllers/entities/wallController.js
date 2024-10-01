function wallAction(item, state, type) {
    console.log(state, active)
    if (state !== 'default' && active) {
        active = false
        if (type === 'Wall left') {
            goLeft(item)
        } else if (type === 'Wall right') {
            goRight(item)
        } else if (type === 'Wall top') {
            goUp(item)
        } else if (type === 'Wall bottom') {
            goDown(item)
        }
    }
}

function goLeft(item) {
    item.posX -= 1
    item.controller.stopMoveRight()
    item.controller.stopMoveLeft()
    item.x = (item.posX + 1) * scene.width - item.width - item.parent.dist
}
function goRight(item) {
    item.posX += 1
    item.controller.stopMoveRight()
    item.controller.stopMoveLeft()
    item.x = item.posX * scene.width + item.parent.dist
}
function goUp(item) {
    item.posY -= 1
    item.controller.stopMoveUp()
    item.controller.stopMoveDown()
    item.y = (item.posY + 1) * scene.height - item.height - item.parent.dist
}
function goDown(item) {
    item.posY += 1
    item.controller.stopMoveUp()
    item.controller.stopMoveDown()
    item.y = item.posY * scene.height + item.parent.dist
}
