WorkerScript.onMessage = function (message) {
    const entityX = message.entityX
    const entityY = message.entityY
    const entityHeight = message.entityHeight
    const entityWidth = message.entityWidth
    const index = message.index
    const model = message.model
    const distance = message.distance

    const indices = []

    for (let i = 0; i < model.count; ++i) {
        console.log(Object.keys(model.get(i)))
        if (model.get(i).index !== index && model.get(i).type !== 'Corridor' && message.posX === model.get(i).posX && message.posY === model.get(i).posY && model.get(i).interact) {
            const item = model.get(i).item
            if (item.x - distance / 2 < entityX + entityWidth && item.x + item.width + distance / 2 > entityX
                    && item.y - distance / 2 < entityY + entityHeight && item.y + item.height + distance / 2 > entityY) {
                indices.push(i)
            }
        }
    }

    WorkerScript.sendMessage({ 'indices': indices })
}
