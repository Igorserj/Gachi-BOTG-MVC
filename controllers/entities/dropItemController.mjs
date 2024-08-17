WorkerScript.onMessage = function(message) {
    const facing = message.facing
    const posX = message.posX
    const posY = message.posY
    const sceneW = message.sceneWidth
    const sceneH = message.sceneHeight
    const entityW = message.entityWidth
    const entityH = message.entityHeight
    const entityX = message.entityX
    const entityY = message.entityY
    const levelModel = message.levelModel
    const colliderModel = message.colliderModel
    const newEntityX = entityX + (facing === 'west' ? -10 : facing === 'east' ? entityW + 10 : entityW / 2)
    const newEntityY = entityY + (facing === 'north' ? -10 : facing === 'south' ? entityH + 10 : entityH / 2)
    let item
    let collide = false

    const deltaX = newEntityX - sceneW * posX//entity.x - scene.width * posX +
    const deltaY = newEntityY - sceneH * posY

    for (let i = 0; i < colliderModel.count; ++i) {
        item = colliderModel.get(i).item
        const itemType = colliderModel.get(i).type
        if (!!item) {
            const posEquality = posX === colliderModel.get(i).posX && posY === colliderModel.get(i).posY
            const horizontalIntersection = newEntityX + entityW > item.x && newEntityX < item.x + item.width
            const verticalIntersection = newEntityY + entityH > item.y && newEntityY < item.y + item.height
            if (posEquality && horizontalIntersection && verticalIntersection) {
                if (!['Enemy', 'Corridor', 'Room', 'Hero', 'Item'].includes(itemType)) {
                    collide = true
                }
            }
        }
    }
    WorkerScript.sendMessage({
                                 'collide': collide,
                                 'deltaX': deltaX,
                                 'deltaY': deltaY,
                                 'posX': posX,
                                 'posY': posY
                             })
}
