function cellSwap() {
    const toItemMeta = cBuffer.toModel.get(cBuffer.toItem.position[0]).metadataList
    const fromItemMeta = cBuffer.fromModel.get(cBuffer.fromItem.position[0]).metadataList

    const toItemEffects = cBuffer.toModel.get(cBuffer.toItem.position[0]).effectsList
    const fromItemEffects = cBuffer.fromModel.get(cBuffer.fromItem.position[0]).effectsList

    let item1 = Object.assign({}, toItemMeta.get(cBuffer.toItem.position[1]))
    let item2 = Object.assign({}, fromItemMeta.get(cBuffer.fromItem.position[1]))

    fromItemMeta.set(cBuffer.fromItem.position[1], item1)
    toItemMeta.set(cBuffer.toItem.position[1], item2)

    item1 = Object.assign({}, toItemEffects.get(cBuffer.toItem.position[1]))
    item2 = Object.assign({}, fromItemEffects.get(cBuffer.fromItem.position[1]))

    fromItemEffects.set(cBuffer.fromItem.position[1], item1)
    toItemEffects.set(cBuffer.toItem.position[1], item2)

    console.log(Object.entries(toItemEffects.get(cBuffer.toItem.position[1])), fromItemEffects.get(cBuffer.fromItem.position[1]).name)
}

function cell() {
    console.log('list2', effectsList)
    if (!!!cBuffer.fromItem && name !== '') {
        cBuffer.fromItem = { metadata: metadataList, position: [cellsItem.i, index], effects: effectsList }
        cBuffer.fromModel = inv
        for (let j = 0; j < effectsList.count; ++j) {
            console.log('efList', effectsList.get(j).name, cBuffer.fromItem.position)
        }
    } else if (!!cBuffer.fromItem && !(cBuffer.fromItem.position[0] === cellsItem.i && cBuffer.fromItem.position[1] === index) && typeCompat()) {
        cBuffer.toItem = { metadata: metadataList, position: [cellsItem.i, index], effects: effectsList }
        cBuffer.toModel = inv
        effectControl()
        cellSwap()
        game.controller.cBufferClear(cBuffer)
    }
}

function typeCompat() {
    if (([cBuffer.fromItem.metadata.get(cBuffer.fromItem.position[1]).type, 'Bag'].map(e => cellList.get(index).type.includes(e))).includes(true)) {
        return true
    } else if (['Dish', 'Drink', 'One hand'].includes(cBuffer.fromItem.metadata.get(cBuffer.fromItem.position[1]).type) && ['Bag', 'Left hand', 'Right hand', 'Two hands'].map(e => cellList.get(index).type.includes(e)).includes(true)) {
        return true
    } else {
        return false
    }
}

function effectControl() {
    if (['Left hand', 'Right hand', 'Two hands', 'Head', 'Torso', 'Legs', 'Feet'].includes(cellList.get(index).type)) {
        game.controller.effectGeneration(hero, cBuffer.fromModel.get(cBuffer.fromItem.position[0]).effectsList, scene.effectModel, cBuffer.fromItem.position[1])
    }
}
