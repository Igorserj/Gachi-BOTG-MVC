import QtQuick 2.15
import QtQuick.Window 2.15
import "config"

Window {
    id: window
    readonly property var routes: Routes {}
    width: 640
    height: 480
    visible: true
    title: "Gachimuchi Boss Of This Gym"

    Loader {
        id: mainLoader
        property var seed
        focus: true
        width: parent.width
        height: parent.height
        source: routes.resources[0].mainMenu
    }
}
