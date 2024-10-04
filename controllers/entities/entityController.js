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

function startRun() {
    if (entity.sta > 0 && (
                moveUpAnimation.running ||
                moveDownAnimation.running ||
                moveLeftAnimation.running ||
                moveRightAnimation.running
                )
            ) {
        runAnimation.start()
    }
}

function stopRun() {
    runAnimation.stop()
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
                                            "distance": entity.dist
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

function pickUpItem(entityInv, model, item, effectsList, k) {
    if (entityInv.name === '' && !!model) {
        entityInv.name = model.name
        entityInv.type = model.metadata.get(0).type
        entityInv.metadataList = model.metadata
        entityInv.cellList = model.cells
        console.log(Object.keys(entityInv))
        for (let j = 0; j < model.effects.count; ++j) {
            console.log("effect name", model.effects.get(j).name)
            effectsList.set(k, model.effects.get(j))
        }
        levelModel.remove(item.entityIndex)
        console.log('list1', effectsList)
        return true
    }
    return false
}

function dropItemMessage(entity, script) {
    script.sendMessage({
                           'facing': entity.face,
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
        const effectsList = cBuffer.fromModel.get(cBuffer.fromItem.position[0]).effectsList
        const meta = new Metadatas(metadataList.get(cBuffer.fromItem.position[1]))
        const cell = new Cells(cellList.get(cBuffer.fromItem.position[1]))
        const effect = new Effects(effectsList.get(cBuffer.fromItem.position[1]))
        levelModel.append({
                              'type': 'Item',
                              'name': meta.name,
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
                              'metadata': meta.constr,
                              'effects': effect.constr,
                              'cells': cell.constr
                          })

        metadataList.setProperty(cBuffer.fromItem.position[1], 'name', '')
        metadataList.setProperty(cBuffer.fromItem.position[1], 'type', '')
        metadataList.set(cBuffer.fromItem.position[1], [])
        effectsList.setProperty(cBuffer.fromItem.position[1], 'name', '')
        cellList.set(cBuffer.fromItem.position[1], [])
        controller.cBufferClear(cBuffer)
    } else {
        console.log("Can't drop item here")
    }   
}

class Effects {
    constructor(effect) {
        this.constr = [{}]
        if (!!effect.name) this.constr[0].name = effect.name
        if (!!effect.mode) this.constr[0].mode = effect.mode
        if (!!effect.characteristic) this.constr[0].characteristic = effect.characteristic
        if (!!effect.type) this.constr[0].type = effect.type
        if (!!effect.subtype) this.constr[0].subtype = effect.subtype
        if (!!effect.duration) this.constr[0].duration = effect.duration
        if (!!effect.period) this.constr[0].period = effect.period
        if (!!effect.activation) this.constr[0].activation = effect.activation
        if (!!effect.points) this.constr[0].points = effect.points
        if (!!effect.identifier) this.constr[0].identifier = effect.identifier
    }
}

class Metadatas {
    constructor(meta) {
        this.name = meta.name
        this.constr = [{}]
        this.constr[0].name = meta.name
        this.constr[0].type = meta.type
    }
}

class Cells {
    constructor(cell) {
        this.constr = [{}]
        this.constr[0].type = cell.type
    }
}
