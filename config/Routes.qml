import QtQuick 2.15

QtObject {
    readonly property var resources: [{ mainMenu: "/views/mainMenu/MainMenu.qml", game: "/views/game/Game.qml" }]
    readonly property var views: [{ controls: "/views/controls", game: "/views/game", gui: "/views/gui", mainMenu: "/views/mainMenu", entities: "/views/entities" }]
    readonly property var controllers: [{ controls: "/controllers/controls", entities: "/controllers/entities", game: "/controllers/game", mainMenu: "/controllers/mainMenu" }]
    readonly property var models: [{ gui: "/models/gui", mainMenu: "/models/mainMenu" }]
}
