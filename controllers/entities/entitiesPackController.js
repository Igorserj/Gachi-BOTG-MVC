function entityChooser(type) {
    if (type === 'Hero') {
        return `${routes.views.entities}/Hero.qml`
    } else if (type === 'Enemy') {
        return `${routes.views.entities}/Enemy.qml`
    } else if (type === 'Wall top' || type === 'Wall bottom') {
        return `${routes.views.entities}/HorizontalWall.qml`
    } else if (type === 'Wall left' || type === 'Wall right') {
        return `${routes.views.entities}/VerticalWall.qml`
    } else if (type === 'Corridor') {
        return `${routes.views.entities}/Corridor.qml`
    } else if (type === 'Room') {
        return `${routes.views.entities}/Room.qml`
    } else if (type === 'Item') {
        return `${routes.views.entities}/FloorItem.qml`
    }
}

function entityPositioner(entity, type, positionX, positionY, deltaX, deltaY) {
    if (type === 'Hero') {
        entity.x = (scene.width - entity.width) / 2
        entity.y = (scene.height - entity.height) / 2
    } else if (type === 'Wall top') {
        entity.x = Qt.binding(() => scene.width * positionX + (scene.width - entity.width) / 2)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Wall bottom') {
        entity.x = Qt.binding(() => scene.width * positionX + (scene.width - entity.width) / 2)
        entity.y = Qt.binding(() => scene.height * (positionY + 1) - entity.height)
    } else if (type === 'Wall left') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * positionY + (scene.height - entity.height) / 2)
    } else if (type === 'Wall right') {
        entity.x = Qt.binding(() => scene.width * (positionX + 1) - entity.width)
        entity.y = Qt.binding(() => scene.height * positionY + (scene.height - entity.height) / 2)
    } else if (type === 'Enemy') {
        entity.x = scene.width / 7
        entity.y = scene.height / 7
    } else if (type === 'Corridor' || type === 'Room') {
        entity.x = entity.width * positionX
        entity.y = entity.height * positionY
    } else if (type === 'Item') {
        entity.x = scene.width * positionX - entity.width / 2
        entity.y = scene.height * positionY - entity.height / 2
    }
    entity.x += deltaX
    entity.y += deltaY
}

function entityInventoryPopulation(entity, type, name, cells, metadata, effects) {
    if (type === 'Hero') {
        const inventory = new EntityInventory()
        inventory.hero()
        entity.inventory.append(inventory.inventory)
        entity.inventory.append(inventory.equip)
    } else if (type === 'Enemy') {
        const inventory = new EntityInventory()
        inventory.enemy()
        entity.inventory.append(inventory.inventory)
        entity.inventory.append(inventory.equip)
    } else if (type === 'Item') {
        entity.inventory.append({
                                    'name': name,
                                    'type': "Cells",
                                    'columns': 1,
                                    'cellList': cells,
                                    'metadataList': metadata,
                                    'effectsList': effects
                                })
    }
}

class EntityInventory {
    hero() {
        const metadataList = [[], []]
        const cellList = [[], []]
        const effectsList = [[], []]
        const equipList = ['Head', 'Torso', 'Legs', 'Feet', 'Left hand', 'Right hand', 'Two hands']
        let i = 0
        while (i < 6) {
            cellList[0].push({ 'type': "Bag" })
            i += 1
        }
        i = 0
        while (i < cellList[0].length) {
            metadataList[0].push({ 'name': "" })
            effectsList[0].push([])
            i += 1
        }
        i = 0
        while (i < equipList.length) {
            cellList[1].push({ 'type': equipList[i] })
            i += 1
        }
        i = 0
        while (i < cellList[1].length) {
            metadataList[1].push({ 'name': "" })
            effectsList[1].push([])
            i += 1
        }
        // metadataList[0][0].name = 'Zalupa'
        // metadataList[0][0].type = 'Two hands'
        this.inventory = {
            'name': "Hero inventory cells",
            'type': "Cells",
            'columns': 5,
            'cellList': cellList[0],
            'metadataList': metadataList[0],
            'effectsList': effectsList[0]
        }
        this.equip = {
            'name': "Hero equipment cells",
            'type': "Cells",
            'columns': 4,
            'cellList': cellList[1],
            'metadataList': metadataList[1],
            'effectsList': effectsList[1]
        }
    }
    enemy() {
        const metadataList = [[], []]
        const cellList = [[], []]
        const effectsList = [[], []]
        const equipList = ['Head', 'Torso', 'Legs', 'Feet', 'Left hand', 'Right hand', 'Two hands']
        let i = 0
        while (i < 6) {
            cellList[0].push({ 'type': "Bag" })
            i += 1
        }
        i = 0
        while (i < cellList[0].length) {
            metadataList[0].push({ 'name': "" })
            effectsList[0].push([])
            i += 1
        }
        i = 0
        while (i < equipList.length) {
            cellList[1].push({ 'type': equipList[i] })
            i += 1
        }
        i = 0
        while (i < cellList[1].length) {
            metadataList[1].push({ 'name': "" })
            effectsList[1].push([])
            i += 1
        }
        this.inventory = {
            'name': "Enemy inventory cells",
            'type': "Cells",
            'columns': 5,
            'cellList': cellList[0],
            'metadataList': metadataList[0],
            'effectsList': effectsList[0]
        }
        this.equip = {
            'name': "Enemy equipment cells",
            'type': "Cells",
            'columns': 4,
            'cellList': cellList[1],
            'metadataList': metadataList[1],
            'effectsList': effectsList[1]
        }
    }
}
