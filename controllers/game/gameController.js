function actionMainGUI() {
    model = mainGUIModel
    guiLoader.source = `${routes.views[0].gui}/MainGUI.qml`
}

function actionMenu() {
    if (model !== menuModel) {
        model = menuModel
        guiLoader.source = `${routes.views[0].gui}/Menu.qml`
    } else {
        actionContinue()
    }
}

function actionContinue() {
    actionMainGUI()
}

function actionSettings() {
    model = settingsModel
    guiLoader.source = `${routes.views[0].gui}/Settings.qml`
}

function actionDebug() {}

function actionMainMenu() {
    mainLoader.source = routes.resources[0].mainMenu
}

function actionQuit() {
    Qt.quit()
}

function actionInventory() {
    if (!!addLoader) {
        if (addLoader.status === Loader.Null) {
            addModel = inventoryModel
            addLoader.source = `${routes.views[0].gui}/Inventory.qml`
        } else if (addLoader.status === Loader.Ready) {
            addLoader.sourceComponent = undefined
            addModel = undefined
        }
    }
}

function actionEntities() {
    if (!!addLoader) {
        if (addLoader.status === Loader.Null) {
            addModel = optionsModel
            addLoader.source = `${routes.views[0].gui}/Options.qml`
            console.log(Object.keys(addModel))
        } else if (addLoader.status === Loader.Ready) {
            addLoader.sourceComponent = undefined
            addModel = undefined
            optionsModel.clear()
        }
    }
}

function invRefAssign(item) {
    addLoader = item
}

function cellsAlignments(index, item) {
    if (index === 0) {
        item.y = (window.height - item.height) / 2
    } else if (index === 1) {
        item.y = window.height - item.height
    } else if (index === 2) {
        item.x = window.width - item.width
        item.y = (window.height - item.height) / 2
    } else if (index === 3) {
        item.x = window.width - item.width
        item.y = window.height - item.height
    }
}

function menuButtons(index) {
    if (index === 0) {
        actionContinue()
    } else if (index === 1) {
        actionSettings()
    } else if (index === 2) {
        actionDebug()
    } else if (index === 3) {
        actionMainMenu()
    } else if (index === 4) {
        actionQuit()
    }
}

function settingsButtons(index) {
    if (index === 4) {
        actionMenu()
    }
}

function keyAction(key, code, isAutoRepeat) {
    console.log(code)
    if (key === Qt.Key_Escape) {
        actionMenu()
    } else if (/*key === Qt.Key_I*/ code === 31) {
        actionInventory()
    } else if (/*key === Qt.Key_M*/ code === 58) {
        openMap()
    } else if (/*key === Qt.Key_W*/ code === 25) {
        hero.parent.allowDown = false
        hero.parent.allowUp = true
        hero.parent.entity.controller.moveUp()
    } else if (/*key === Qt.Key_S*/ code === 39) {
        hero.parent.allowUp = false
        hero.parent.allowDown = true
        hero.parent.entity.controller.moveDown()
    } else if (/*key === Qt.Key_A*/ code === 38) {
        hero.parent.allowRight = false
        hero.parent.allowLeft = true
        hero.parent.entity.controller.moveLeft()
    } else if (/*key === Qt.Key_D*/ code === 40) {
        hero.parent.allowLeft = false
        hero.parent.allowRight = true
        hero.parent.entity.controller.moveRight()
    } else if (/*key === Qt.Key_N*/ code === 57) {
        hero.parent.noClip = !hero.parent.noClip
    } else if (/*key === Qt.Key_E*/ code === 26) {
        hero.controller.interact()
        // hero.parent.noClip = !hero.parent.noClip
    }
}

function keyReleaseAction(key, code, isAutoRepeat) {
    if (!isAutoRepeat) {
        if (code === 25) {
            hero.parent.allowUp = false
            hero.controller.stopMoveUp()
        } else if (code === 39) {
            hero.parent.allowDown = false
            hero.controller.stopMoveDown()
        } else if (code === 38) {
            hero.parent.allowLeft = false
            hero.controller.stopMoveLeft()
        } else if (code === 40) {
            hero.parent.allowRight = false
            hero.controller.stopMoveRight()
        }
    }
}

function cellBufferMovement(corX, corY, cBuffer) {
    cBuffer.x = corX
    cBuffer.y = corY
}

function optionInteract(entity) {
    entity.active = true
    addModel = undefined
    addLoader.sourceComponent = undefined
}

function openMap() {
    if (!!addLoader) {
        if (addLoader.status === Loader.Null) {
            addModel = mapModel
            addLoader.source = `${routes.views[0].gui}/Map.qml`
        } else if (addLoader.status === Loader.Ready) {
            addLoader.sourceComponent = undefined
            addModel = undefined
        }
    }
}

function mapElementGetX(mapLayer, index) {
    const poses = Object.values(addModel.get(mapLayer).poses.get(index))
    if (poses[2] - poses[0] === 1) {
        return poses[0] * window.height / 20 + (window.height / 20 - width)
    } else{
        return poses[0] * window.height / 20
    }
}

function mapElementGetY(mapLayer, index) {
    const poses = Object.values(addModel.get(mapLayer).poses.get(index))
    if (poses[3] - poses[1] === 1) {
        return poses[1] * window.height / 20 + (window.height / 20 - height)
    } else {
        return poses[1] * window.height / 20
    }
}

function mapElementGetHeight(type, mapLayer, identifier) {
    switch (type) {
    case "vertical pass":
        return window.height / 160
    default:
        const connects = addModel.get(mapLayer).connects
        for (var i = 0; i < connects.count; ++i) {
            if (identifier === connects.get(i).identifier
                    && connects.get(i).type === "to top") {
                return 0
            } else if (identifier === connects.get(i).identifier
                       && connects.get(i).type === "to bottom") {
                return window.height / 10
            }
        }
        return window.height / 20
    }
}

function mapElementGetWidth(type, mapLayer, identifier) {
    switch (type) {
    case "horizontal pass":
        return window.height / 160
    default:
        const connects = addModel.get(mapLayer).connects
        for (var i = 0; i < connects.count; ++i) {
            if (identifier === connects.get(i).identifier
                    && connects.get(i).type === "to left") {
                return 0
            } else if (identifier === connects.get(i).identifier
                       && connects.get(i).type === "to right") {
                return window.height / 10
            }
        }
        return window.height / 20
    }
}

function mapElementGetText(type, mapLayer, identifier) {
    let text = ""
    if (type === "horizontal pass" || type === "vertical pass") {
        text = ""
    } else {
        text = identifier
    }

    if (type === "crossnode") {
        text += "c"
    } else if (type === "entrynode") {
        text += "e"
    } else if (type === "entry") {
        text += ">"
    } else if (type === "exit") {
        text += "^"
    } else {
        text += ""
    }

    const connects = addModel.get(mapLayer).connects
    for (let i = 0; i < connects.count; ++i) {
        if (identifier === connects.get(i).identifier && connects.get(i).type === "to left") {
            text = ""
        } else if (identifier === connects.get(i).identifier && connects.get(i).type === "to top") {
            text = ""
        }
    }
    return text
}
