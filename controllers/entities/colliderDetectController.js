function collistionDetectScript(entity, distance, noClip, posX, posY, colliderModel) {

    let item
    const xs = []
    const ys = []
    let i = 0
    let j = 0
    let minimalX = Infinity
    let minimalY = Infinity
    const parent = entity.parent

    function horizontalIntersectAction() {
        if (parent.allowLeft && entity.x < item.x + item.width && item.x + item.width < entity.x + entity.width) {
            parent.allowLeft = false
            entity.controller.stopMoveLeft()
            xs.push(item.x + item.width + 1)
        } else if (parent.allowRight && entity.x + entity.width > item.x && item.x > entity.x) {
            parent.allowRight = false
            entity.controller.stopMoveRight()
            xs.push(item.x - entity.width - 1)
        }
    }

    function verticalIntersectAction() {
        if (parent.allowUp && entity.y < item.y + item.height && item.y + item.height < entity.y + entity.height) {
            parent.allowUp = false
            entity.controller.stopMoveUp()
            ys.push(item.y + item.height + 1)
        } else if (parent.allowDown && entity.y + entity.height > item.y && item.y > entity.y) {
            parent.allowDown = false
            entity.controller.stopMoveDown()
            ys.push(item.y - entity.height - 1)
        }
    }

    function pickUpAction() {
        const count = parent.inventory.get(0).metadataList.count
        for (j = 0; j < count; ++j) {
            if (entity.controller.pickUpItem(parent.inventory.get(0).metadataList.get(j), levelModel.get(item.parent.entityIndex), item.parent)) j = count
        }
    }

    for (i = 0; i < colliderModel.count; ++i) {
        item = colliderModel.get(i).item
        const itemType = colliderModel.get(i).type
        if (!!item) {
            const posEquality = posX === colliderModel.get(i).posX && posY === colliderModel.get(i).posY
            const horizontalIntersection = entity.x + entity.width > item.x && entity.x < item.x + item.width
            const verticalIntersection = entity.y + entity.height > item.y && entity.y < item.y + item.height
            if (posEquality && horizontalIntersection && verticalIntersection && !noClip) {
                if (!['Enemy', 'Corridor', 'Room', 'Hero', 'Item'].includes(itemType)) {
                    horizontalIntersectAction()
                    verticalIntersectAction()
                } else if (['Item'].includes(itemType) && !!parent.inventory.get(0)) {
                    pickUpAction()
                }
            }
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
