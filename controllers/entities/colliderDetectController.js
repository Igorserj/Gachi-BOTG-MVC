function collistionDetectScript(entity, distance, noClip, posX, posY, colliderModel) {
    // console.log(Object.entries(arguments))

    // const noClip = message.noClip

    let item
    let itemType
    const xs = []
    const ys = []
    let i = 0
    let minimalX = Infinity
    let minimalY = Infinity

    console.log(colliderModel.count)
    for (i = 0; i < colliderModel.count; ++i) {
        item = colliderModel.get(i).item
        if (colliderModel.get(i).type !== 'Enemy' /*&& colliderModel.get(i).type !== 'entity'*/ && colliderModel.get(i).type !== 'Corridor' && posX === colliderModel.get(i).posX && posY === colliderModel.get(i).posY && (entity.x + entity.width > item.x && entity.x < item.x + item.width) && (entity.y + entity.height > item.y && entity.y < item.y + item.height)) {
            // if ((entity.x + entity.width > item.x && entity.x < item.x + item.width) && (entity.y + entity.height > item.y && entity.y < item.y + item.height) && entity.type !== itemType) {

            if (entity.parent.allowLeft && entity.x < item.x + item.width && item.x + item.width < entity.x + entity.width) {
                entity.parent.allowLeft = false
                entity.parent.entity.controller.stopMoveLeft()
                xs.push(item.x + item.width + 1)
            } else if (entity.parent.allowRight && entity.x + entity.width > item.x && item.x > entity.x) {
                entity.parent.allowRight = false
                entity.parent.entity.controller.stopMoveRight()
                xs.push(item.x - entity.width - 1)
            }

            if (entity.parent.allowUp && entity.y < item.y + item.height && item.y + item.height < entity.y + entity.height) {
                entity.parent.allowUp = false
                entity.parent.entity.controller.stopMoveUp()
                ys.push(item.y + item.height + 1)
            } else if (entity.parent.allowDown && entity.y + entity.height > item.y && item.y > entity.y) {
                entity.parent.allowDown = false
                entity.parent.entity.controller.stopMoveDown()
                ys.push(item.y - entity.height - 1)
            }
            // }
        }
    }
    for (i = 0; i < xs.length; ++i) {
        if (Math.abs(entity.x - xs[i]) < Math.abs(minimalX - xs[i])) {
            minimalX = xs[i]
        }
    }
    for (i = 0; i < ys.length; ++i) {
        if (Math.abs(entity.y - ys[i]) < Math.abs(minimalY - ys[i])) {
            minimalY = ys[i]
        }
    }

    if (minimalX !== Infinity) entity.x = minimalX
    if (minimalY !== Infinity) entity.y = minimalY
}
