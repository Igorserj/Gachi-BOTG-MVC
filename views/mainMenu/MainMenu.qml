import QtQuick 2.15
import "../../controllers/mainMenuController.js" as Controller
import "../../models/mainMenu"

Item {
    id: mainMenu
    property var model
    readonly property var controller: Controller
    Component.onCompleted: controller.actionMenu()

    Loader {
        id: menuLoader
        anchors.fill: parent
        asynchronous: true
    }

    MenuModel {
        id: menuModel
    }
    SettingsModel {
        id: settingsModel
    }
    StartGameModel {
        id: startGameModel
    }
}
