function entityChooser(type) {
    if (type === 'Hero') {
        return `${routes.views[0].entities}/Hero.qml`
    } else if (type === 'Enemy') {
        return `${routes.views[0].entities}/Enemy.qml`
    } else if (type === 'Wall top' || type === 'Wall bottom') {
        return `${routes.views[0].entities}/HorizontalWall.qml`
    } else if (type === 'Wall left' || type === 'Wall right') {
        return `${routes.views[0].entities}/VerticalWall.qml`
    } else if (type === 'Corridor') {
        return `${routes.views[0].entities}/Corridor.qml`
    }
}

function entityPositioner(entity, type, positionX, positionY) {
    if (type === 'Hero') {
        entity.x = (scene.width - entity.width) / 2
        entity.y = (scene.height - entity.height) / 2
    } else if (type === 'Wall top') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Wall bottom') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * (positionY + 1) - entity.height)
    } else if (type === 'Wall left') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Wall right') {
        entity.x = Qt.binding(() => scene.width * (positionX + 1) - entity.width)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Enemy') {
        entity.x = scene.width / 7
        entity.y = scene.height / 7
    } else if (type === 'Corridor') {
        entity.x = entity.width * positionX
        entity.y = entity.height * positionY
    }
}

function entityInventoryPopulation(entity, type) {
    if (type === 'Hero') {
        let cellList = []
        let metadataList = []
        let i
        for (i = 0; i < 6; ++i) {
            cellList.push({ 'type': "Bag" })
        }

        for (i = 0; i < cellList.length; ++i) {
            metadataList.push({ 'name': "" })
        }
        metadataList[0].name = 'Zalupa'
        metadataList[0].type = 'One hand'
        entity.inventory.append({
                                    'name': "Hero inventory cells",
                                    'type': "Cells",
                                    'columns': 5,
                                    'cellList': cellList.slice(),
                                    'metadataList': metadataList.slice()
                                })

        cellList = []
        metadataList = []
        cellList.push({ 'type': "Head" })
        cellList.push({ 'type': "Torso" })
        cellList.push({ 'type': "Legs" })
        cellList.push({ 'type': "Feet" },)
        cellList.push({ 'type': "Left hand" })
        cellList.push({ 'type': "Right hand" })
        cellList.push({ 'type': "Two hands" })

        for (i = 0; i < cellList.length; ++i) {
            metadataList.push({ 'name': "" })
        }

        entity.inventory.append({
                                    'name': "Hero equipment cells",
                                    'type': "Cells",
                                    'columns': 4,
                                    'cellList': cellList.slice(),
                                    'metadataList': metadataList.slice()
                                })
    }
}
