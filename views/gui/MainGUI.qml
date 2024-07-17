import QtQuick 2.15
import "../controls"

Item {
    Row {
        spacing: window.height * 0.025
        Repeater {
            model: game.model
            delegate: ControlsPack {
                // function controlsAction(index) { controller.settingsButtons(index) }
            }
        }
    }

    Loader {
        anchors.fill: parent
        asynchronous: true
        Component.onCompleted: controller.invRefAssign(this)
    }
}
