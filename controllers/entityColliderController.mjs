WorkerScript.onMessage = function (message) {
    const entityX = message.entityX
    const entityY = message.entityY
    const entityHeight = message.entityHeight
    const entityWidth = message.entityWidth
    const index = message.index
    const model = message.model
    const distance = message.distance
    const direction = message.direction

    let upperBound = 0
    let lowerBound = 0
    let leftBound = 0
    let rightBound = 0
    let horizontalBound = 0

    let verticalBound = 0
    let deltaX = []
    let deltaY = []
    const baseDuration = message.duration
    let closestIds = {
        "x": -1,
        "y": -1
    }

    let horizontalDistance = -1
    let verticalDistance = -1

    let item
    let itemIndex

    for (var i = 0; i < model.count; ++i) {
        item = model.get(i).item
        itemIndex = model.get(i).index
        lowerBound = entityY - distance <= item.y + item.height
        upperBound = entityY + entityHeight + distance >= item.y
        rightBound = entityX - distance <= item.x + item.width
        leftBound = entityX + entityWidth + distance >= item.x

        horizontalBound = entityX + entityWidth >= item.x && entityX <= item.x + item.width
        verticalBound = entityY + entityHeight >= item.y && entityY <= item.y + item.height

        if (verticalBound && leftBound && rightBound && index !== itemIndex
                && (direction === "left" || direction === "right")) {
            if (entityX + entityWidth / 2 + distance > item.x + item.width / 2
                    && direction === "left") {
                deltaX.push(Math.abs(entityX - (item.x + item.width)))
            } else if (entityX + entityWidth / 2 - distance <= item.x + item.width / 2
                       && direction === "right") {
                deltaX.push(Math.abs((entityX + entityWidth) - item.x))
            }
        } else if (horizontalBound && upperBound && lowerBound && index !== itemIndex
                   && (direction === "up" || direction === "down")) {
            if (entityY + entityHeight / 2 + distance > item.y + item.height / 2
                    && direction === "up") {
                deltaY.push(Math.abs(entityY - (item.y + item.height)))
            } else if (entityY + entityHeight / 2 - distance <= item.y + item.height / 2
                       && direction === "down") {
                deltaY.push(Math.abs((entityY + entityHeight) - item.y))
            }
        } else if (direction === "up" || direction === "down") {
            deltaY.push(distance)
        } else if (direction === "right" || direction === "left") {
            deltaX.push(distance)
        }
    }

    deltaX = Math.min(...deltaX)
    deltaY = Math.min(...deltaY)
    const durationX = deltaX / distance * baseDuration
    const durationY = deltaY / distance * baseDuration

    WorkerScript.sendMessage({
                                 "deltaX": deltaX,
                                 "deltaY": deltaY,
                                 "direction": direction,
                                 "durationX": durationX,
                                 "durationY": durationY
                             })
}
