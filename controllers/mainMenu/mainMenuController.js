function actionStartGame() {
    mainMenu.model = startGameModel
    menuLoader.source = `${routes.views.mainMenu}/StartGame.qml`
}

function actionLoadGame() {
    menuLoader.source = `${routes.views.mainMenu}/LoadGame.qml`
}

function actionMenu() {
    mainMenu.model = menuModel
    menuLoader.source = `${routes.views.mainMenu}/Menu.qml`
}

function actionSettings() {
    mainMenu.model = settingsModel
    menuLoader.source = `${routes.views.mainMenu}/Settings.qml`
}

function actionNewGame() {
    seed = [5,6,2,5,9,7,9,6]//seedGenerator()
    mainLoader.source = routes.resources.game
}

function exit() {
    Qt.quit()
}

function menuButtons(index) {
    if (index === 0) {
        actionStartGame()
    }
    else if (index === 1) {
        actionSettings()
    }
    else if (index === 2) {
        exit()
    }
}

function settingsButtons(index) {
    if (index === 0) {}
    else if (index === 4) {
        actionMenu()
    }
}

function startGameButtons(index) {
    if (index === 0) {
        actionNewGame()
    }
    else if (index === 2) {
        actionLoadGame()
    }
    else if (index === 3) {
        actionMenu()
    }
}

function seedGenerator() {
    const seed = []
    for (let i = 0; i < Array(8).length; ++i) {
        seed.push(Math.round(9 * Math.random()))
    }
    return seed
}
