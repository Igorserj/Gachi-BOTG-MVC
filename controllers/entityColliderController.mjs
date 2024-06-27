WorkerScript.onMessage = function (message) {
    const entityX = message.entityX
    const entityY = message.entityY
    const entityHeight = message.entityHeight
    const entityWidth = message.entityWidth
    const index = message.index
    const model = message.model
    const distance = message.distance
    const direction = message.direction
    const noClip = message.noClip

    let deltaX = Infinity
    let deltaY = Infinity
    const baseDuration = message.duration

    if (!noClip) {
        for (let i = 0; i < model.count; ++i) {
            if (model.get(i).type !== 'Enemy' && model.get(i).type !== 'Hero' && model.get(i).type !== 'Corridor' && message.posX === model.get(i).posX && message.posY === model.get(i).posY) {
                const item = model.get(i).item
                // const itemIndex = model.get(i).index
                const lowerBound = entityY - distance <= item.y + item.height
                const upperBound = entityY + entityHeight + distance >= item.y
                const rightBound = entityX - distance <= item.x + item.width
                const leftBound = entityX + entityWidth + distance >= item.x

                const horizontalBound = entityX + entityWidth > item.x && entityX < item.x + item.width
                const verticalBound = entityY + entityHeight > item.y && entityY < item.y + item.height

                if (verticalBound && leftBound && rightBound //&& index !== itemIndex
                        && (direction === "left" || direction === "right")) {
                    if (entityX + entityWidth / 2 + distance > item.x + item.width / 2
                            && direction === "left"
                            && Math.abs(entityX - (item.x + item.width)) < deltaX) {
                        deltaX = Math.abs(entityX - (item.x + item.width))
                    } else if (entityX + entityWidth / 2 - distance <= item.x + item.width / 2
                               && direction === "right"
                               && Math.abs((entityX + entityWidth) - item.x) < deltaX) {
                        deltaX = Math.abs((entityX + entityWidth) - item.x)
                    }
                } else if (horizontalBound && upperBound && lowerBound //&& index !== itemIndex
                           && (direction === "up" || direction === "down")) {
                    if (entityY + entityHeight / 2 + distance > item.y + item.height / 2
                            && direction === "up"
                            && Math.abs(entityY - (item.y + item.height)) < deltaY) {
                        deltaY = Math.abs(entityY - (item.y + item.height))
                    } else if (entityY + entityHeight / 2 - distance <= item.y + item.height / 2
                               && direction === "down"
                               && Math.abs((entityY + entityHeight) - item.y) < deltaY) {
                        deltaY = Math.abs((entityY + entityHeight) - item.y)
                    }
                } else if ((direction === "up" || direction === "down")
                           && (distance < deltaY)) {
                    deltaY = distance
                } else if ((direction === "right" || direction === "left")
                           && (distance < deltaX)) {
                    deltaX = distance
                }
            }
        }
    } else {
        if (direction === "up" || direction === "down") {
            deltaY = distance
        } else if (direction === "right" || direction === "left") {
            deltaX = distance
        }
    }

    const durationX = deltaX / distance * baseDuration
    const durationY = deltaY / distance * baseDuration
    console.log(durationX, durationY)

    WorkerScript.sendMessage({
                                 "deltaX": deltaX,
                                 "deltaY": deltaY,
                                 "direction": direction,
                                 "durationX": durationX,
                                 "durationY": durationY
                             })
}
