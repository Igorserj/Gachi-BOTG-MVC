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
    let l;
    for (l of Object.entries(item1)) {
        fromItemEffects.get(cBuffer.fromItem.position[1])[l[0]] = l[1]
    }
    for (l of Object.entries(item2)) {
        toItemEffects.get(cBuffer.toItem.position[1])[l[0]] = l[1]
    }
    delete l
    // fromItemEffects.remove(cBuffer.fromItem.position[1])
    // toItemEffects.remove(cBuffer.toItem.position[1])
    // fromItemEffects.insert(cBuffer.fromItem.position[1], item1)
    // toItemEffects.insert(cBuffer.toItem.position[1], item2)
}

function cell() {
    console.log('list2', effectsList)
    if (!!!cBuffer.fromItem && name !== '') {
        cBuffer.state = "movement"
        cBuffer.fromItem = {
            "metadata": metadataList,
            "position": [cellsItem.i, index],
            "effects": effectsList
        }
        cBuffer.fromModel = inv
        console.log(Object.entries(effectsList.get(0)))
    } else if (!!cBuffer.fromItem && typeCompat()) {
        cBuffer.toItem = {
            "metadata": metadataList,
            "position": [cellsItem.i, index],
            "effects": effectsList
        }
        cBuffer.toModel = inv
        effectControl()
        cellSwap()
        game.controller.cBufferClear(cBuffer)
        cBuffer.state = "description"
        let desc = ""
        console.log(Object.entries(effectsList.get(index)))
        for (let d = 0; d < Object.keys(effectsList.get(index)).length; ++d) {
            desc += `${effectsList.get(index)[d].name} ${effectsList.get(index)[d].duration} ${effectsList.get(index)[d].identifier} ${effectsList.get(index)[d].mode}
`
        }
        cBuffer.desc = desc
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
