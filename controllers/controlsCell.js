function cellSwap() {
    const model = addModel
    const toItemGet = model.get(cBuffer.toItem.position[0]).metadataList
    const fromItemGet = model.get(cBuffer.fromItem.position[0]).metadataList
    const item1 = Object.assign({}, toItemGet.get(cBuffer.toItem.position[1]))
    const item2 = Object.assign({}, fromItemGet.get(cBuffer.fromItem.position[1]))

    fromItemGet.set(cBuffer.fromItem.position[1], item1)
    toItemGet.set(cBuffer.toItem.position[1], item2)
    cBuffer.toItem = undefined
    cBuffer.fromItem = undefined
}

function cell() {
    if (!!!cBuffer.fromItem && name !== "") {
        cBuffer.fromItem = { metadata: metadataList, position: [cellsItem.i, index] }
    }
    else if (!!cBuffer.fromItem && !(cBuffer.fromItem.position[0] === cellsItem.i && cBuffer.fromItem.position[1] === index) && typeCompat()) {
        cBuffer.toItem = { metadata: metadataList, position: [cellsItem.i, index] }
        cellSwap()
    }
}

function typeCompat() {
    if (([cBuffer.fromItem.metadata.get(cBuffer.fromItem.position[1]).type, "Bag"].map((e)=>cellList.get(index).type.includes(e))).includes(true)) {
        return true
    }
    else if (["Dish", "Drink", "One hand"].includes(cBuffer.fromItem.metadata.get(cBuffer.fromItem.position[1]).type) && ["Bag", "Left hand", "Right hand", "Two hands"].map((e)=>cellList.get(index).type.includes(e)).includes(true)) {
        return true
    }
    else {
        return false
    }
}
