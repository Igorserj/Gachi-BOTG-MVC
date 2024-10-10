class Routes {
    constructor() {
        this.resources = { mainMenu: "/views/mainMenu/MainMenu.qml", game: "/views/game/Game.qml" }
        this.views = { controls: "/views/controls", game: "/views/game", gui: "/views/gui", mainMenu: "/views/mainMenu", entities: "/views/entities" }
        this.controllers = { controls: "/controllers/controls", entities: "/controllers/entities", game: "/controllers/game", mainMenu: "/controllers/mainMenu" }
        this.models = { gui: "/models/gui", mainMenu: "/models/mainMenu" }
    }
}
