import QtQuick 2.15
import "../../controllers/gameController.js" as Controller
import "../../models/gui"
import "../../models/game"

Item {
    id: game
    property var model
    property var addModel
    property var addLoader
    property var hero
    readonly property var controller: Controller
    focus: true
    Keys.onPressed: (event)=> controller.keyAction(event.key, event.nativeScanCode, event.isAutoRepeat)
    Keys.onReleased: (event)=> controller.keyReleaseAction(event.key, event.nativeScanCode, event.isAutoRepeat)

    Generator {}
    Scene {}
    // Scene2 {}

    Loader {
        id: guiLoader
        anchors.fill: parent
        asynchronous: true
    }

    MainGUIModel {
        id: mainGUIModel
    }
    MenuModel {
        id: menuModel
    }
    SettingsModel {
        id: settingsModel
    }
    InventoryModel {
        id: inventoryModel
    }
    MapModel {
        id: mapModel
    }
    LevelModel {
        id: levelModel
    }
}
