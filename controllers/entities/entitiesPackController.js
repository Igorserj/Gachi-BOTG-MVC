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
    } else if (type === 'Room') {
        return `${routes.views[0].entities}/Room.qml`
    } else if (type === 'Item') {
        return `${routes.views[0].entities}/FloorItem.qml`
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
    let cellList = []
    let metadataList = []
    let effectsList = []
    let i
    if (type === 'Hero') {
        for (i = 0; i < 6; ++i) {
            cellList.push({ 'type': "Bag" })
        }

        for (i = 0; i < cellList.length; ++i) {
            metadataList.push({ 'name': "" })
            effectsList.push({ 'name': "" })
        }

        metadataList[0].name = 'Zalupa'
        metadataList[0].type = 'One hand'
        entity.inventory.append({
                                    'name': "Hero inventory cells",
                                    'type': "Cells",
                                    'columns': 5,
                                    'cellList': cellList.slice(),
                                    'metadataList': metadataList.slice(),
                                    'effectsList': effectsList.slice()
                                })

        cellList = []
        metadataList = []
        effectsList = []
        const equipList = ['Head', 'Torso', 'Legs', 'Feet', 'Left hand', 'Right hand', 'Two hands']
        equipList.forEach(e => cellList.push({ 'type': e }))

        for (i = 0; i < cellList.length; ++i) {
            metadataList.push({ 'name': "" })
            effectsList.push({ 'name': "" })
        }

        entity.inventory.append({
                                    'name': "Hero equipment cells",
                                    'type': "Cells",
                                    'columns': 4,
                                    'cellList': cellList.slice(),
                                    'metadataList': metadataList.slice(),
                                    'effectsList': effectsList.slice()
                                })
    } else if (type === 'Enemy') {
        for (i = 0; i < 6; ++i) {
            cellList.push({ 'type': "Bag" })
        }

        for (i = 0; i < cellList.length; ++i) {
            metadataList.push({ 'name': "" })
            effectsList.push({ 'name': "" })
        }
        metadataList[0].name = 'Penis'
        metadataList[0].type = 'Head'

        entity.inventory.append({
                                    'name': "Enemy inventory cells",
                                    'type': "Cells",
                                    'columns': 5,
                                    'cellList': cellList.slice(),
                                    'metadataList': metadataList.slice(),
                                    'effectsList': effectsList.slice()
                                })

        cellList = []
        metadataList = []
        effectsList = []
        const equipList = ['Head', 'Torso', 'Legs', 'Feet', 'Left hand', 'Right hand', 'Two hands']
        equipList.forEach(e => cellList.push({ 'type': e }))

        for (i = 0; i < cellList.length; ++i) {
            metadataList.push({ 'name': "" })
            effectsList.push({ 'name': "" })
        }

        entity.inventory.append({
                                    'name': "Enemy equipment cells",
                                    'type': "Cells",
                                    'columns': 4,
                                    'cellList': cellList.slice(),
                                    'metadataList': metadataList.slice(),
                                    'effectsList': effectsList.slice()
                                })
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

// function entityEffectPopulation(entity, effects) {
//     for (let i = 0; i < effects.count; ++i) {
//         for (let j = 0; j < effectModel.count; ++j) {
//             if (effects.get(i).name === effectModel.get(j).name) {
//                 let effect = []

//                 if (!!effects.get(i).mode) effect[0].mode = effects.get(i).mode
//                 else effect.push({mode: effectModel.get(j).mode})

//                 if (!!effects.get(i).characteristic) effect[0].characteristic = effects.get(i).characteristic
//                 else effect.push({characteristic: effectModel.get(j).characteristic})

//                 if (!!effects.get(i).type) effect[0].type = effects.get(i).type
//                 else effect.push({type: effectModel.get(j).type})

//                 if (!!effects.get(i).subtype) effect[0].subtype = effects.get(i).subtype
//                 else effect.push({subtype: effectModel.get(j).subtype})

//                 if (!!effects.get(i).duration) effect[0].duration = effects.get(i).duration
//                 else effect.push({duration: effectModel.get(j).duration})

//                 if (!!effects.get(i).period) effect[0].period = effects.get(i).period
//                 else effect.push({period: effectModel.get(j).period})

//                 if (!!effects.get(i).activation) effect[0].activation = effects.get(i).activation
//                 else effect.push({activation: effectModel.get(j).activation})

//                 if (!!effects.get(i).points) effect[0].points = effects.get(i).points
//                 else effect.push({points: effectModel.get(j).points})

//                 if (!!effects.get(i).identifier) effect[0].identifier = effects.get(i).identifier
//                 else effect.push({identifier: effectModel.get(j).identifier})

//                 entity.effectsList.append(effect)
//                 console.log(effectModel.get(j).identifier)
//                 j = effectModel.count
//             }
//             console.log(entity.effectsList.get(0).identifier, entity.effectsList.get(0).duration,  entity.effectsList.get(0).points)
//         }
//     }
// }
