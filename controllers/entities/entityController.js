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
    allowLeft = false
    moveLeftAnimation.stop()
}
function stopMoveRight() {
    allowRight = false
    moveRightAnimation.stop()
}
function stopMoveUp() {
    allowUp = false
    moveUpAnimation.stop()
}
function stopMoveDown() {
    allowDown = false
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
                                            "index": entity.index,
                                            "model": colliderModel,
                                            "posX": posX,
                                            "posY": posY,
                                            "distance": distance
                                        })
}

function interactionDetectMessage(messageObject) {
    const indices = messageObject.indices
    game.controller.addLoaderUnload()
    if (indices.length > 1) {
        const options = []
        for (let i = 0; i < indices.length; ++i) {
            options.push({ 'name': optionNameChooser(colliderModel.get(indices[i]).type), 'entity': colliderModel.get(indices[i]).item.parent })
        }
        optionsModel.clear()
        optionsModel.append({
                                'name': 'What to do?',
                                'options': options,
                                'type': 'Options list',
                            })
        game.controller.actionEntities()
    } else {
        colliderModel.get(indices[0]).item.parent.active = true
    }
}

function optionNameChooser(type) {
    if (type === 'Wall top') {
        return 'Go up'
    } else if (type === 'Wall bottom') {
        return 'Go down'
    } else if (type === 'Wall left') {
        return 'Go left'
    } else if (type === 'Wall right') {
        return 'Go right'
    } else if (type === 'Hero' || type === 'Enemy') {
        return 'Loot'
    } else return ''
}

function lootAction(entity) {
    game.controller.actionInventory(entity)
}

function pickUpItem(entityInv, model, item) {
    if (entityInv.name === '' && !!model) {
        entityInv.name = model.name
        entityInv.type = model.metadata.get(0).type
        entityInv.metadataList = model.metadata
        entityInv.cellList = model.cells
        levelModel.remove(item.entityIndex)
        return true
    }
    return false
}

function dropItemMessage(entity, metadataList, cellList, script) {
    script.sendMessage({
                           'facing': entity.facing,
                           'posX': entity.posX,
                           'posY': entity.posY,
                           'sceneWidth': scene.width,
                           'sceneHeight': scene.height,
                           'entityWidth': entity.width,
                           'entityHeight': entity.height,
                           'entityX': entity.x,
                           'entityY': entity.y,
                           'levelModel': levelModel,
                           'colliderModel': colliderModel
                       })
}

function dropItem(messageObject, cBuffer, controller) {
    if (!messageObject.collide) {
        const metadataList = cBuffer.fromModel.get(cBuffer.fromItem.position[0]).metadataList
        const cellList = cBuffer.fromModel.get(cBuffer.fromItem.position[0]).cellList

        levelModel.append({
                              'type': 'Item',
                              'name': metadataList.get(cBuffer.fromItem.position[1]).name,
                              'health': 0,
                              'stamina': 0,
                              'maxHealth': 0,
                              'maxStamina': 0,
                              'modelState': 'default',
                              'interact': false,
                              'positionX': messageObject.posX,
                              'positionY': messageObject.posY,
                              'deltaX': messageObject.deltaX,
                              'deltaY': messageObject.deltaY,
                              'metadata': [{'name': metadataList.get(cBuffer.fromItem.position[1]).name, 'type': metadataList.get(cBuffer.fromItem.position[1]).type}],
                              'cells': [{'type': cellList.get(cBuffer.fromItem.position[1]).type}]
                          })

        metadataList.setProperty(cBuffer.fromItem.position[1], 'name', '')
        metadataList.setProperty(cBuffer.fromItem.position[1], 'type', '')
        metadataList.set(cBuffer.fromItem.position[1], [])
        cellList.set(cBuffer.fromItem.position[1], [])
        controller.cBufferClear(cBuffer)
    }
}
