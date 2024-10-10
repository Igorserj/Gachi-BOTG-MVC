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

function pickUpItem(inv, model, item, effectsList, k) {
    const entityInv = inv.get(k)
    const effects = []
    if (entityInv.name === '' && !!model) {
        inv.setProperty(k, 'name', model.name)
        console.log(model.metadata)
        inv.setProperty(k, 'type', model.metadata.type)
        entityInv.metadataList = model.metadata
        entityInv.cellList = model.cells
        let j = 0
        for (j = 0; j < model.effects.count; ++j) {
            console.log("effect name", Object.entries(model.effects.get(j)))
            effects.push(model.effects.get(j))
        }
        console.log(effects, Object.entries(effectsList.get(k)))

        // effectsList.remove(k, 1)
        // effectsList.insert(k, [])

        for (j = 0; j < effects.length; ++j) {
            for (const l of Object.entries(effects[j])) {
                if (!effectsList.get(k)[j]) effectsList.get(k)[j] = {}
                effectsList.get(k)[j][l[0]] = l[1]
            }
        }
        console.log(Object.entries(effectsList.get(k)).map((e)=>`${e[1].name} ${e[1].duration} ${e[1].identifier}`))
        levelModel.remove(item.entityIndex)
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
        console.log("EL", Object.entries(effectsList.get(cBuffer.fromItem.position[1])))
        const effect = new Effects(effectsList.get(cBuffer.fromItem.position[1]))
        console.log('Meta', Object.entries(meta.constr))
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
        effectsList.set(cBuffer.fromItem.position[1], [])
        cellList.set(cBuffer.fromItem.position[1], [])
        controller.cBufferClear(cBuffer)
    } else {
        console.log("Can't drop item here")
    }   
}

class Effects {
    constructor(effect) {
        this.constr = []
        for (let l = 0; l < Object.keys(effect); ++l) {
            if (!!effect.name) this.constr[l].name = effect.name
            if (!!effect.mode) this.constr[l].mode = effect.mode
            if (!!effect.characteristic) this.constr[l].characteristic = effect.characteristic
            if (!!effect.type) this.constr[l].type = effect.type
            if (!!effect.subtype) this.constr[l].subtype = effect.subtype
            if (!!effect.duration) this.constr[l].duration = effect.duration
            if (!!effect.period) this.constr[l].period = effect.period
            if (!!effect.activation) this.constr[l].activation = effect.activation
            if (!!effect.points) this.constr[l].points = effect.points
            if (!!effect.identifier) this.constr[l].identifier = effect.identifier
        }
    }
}

class Metadatas {
    constructor(meta) {
        this.name = meta.name
        this.constr = {}
        this.constr.name = meta.name
        this.constr.type = meta.type
    }
}

class Cells {
    constructor(cell) {
        this.constr = {}
        this.constr.type = cell.type
    }
}
