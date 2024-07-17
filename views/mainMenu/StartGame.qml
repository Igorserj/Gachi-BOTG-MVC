import QtQuick 2.15
import "../controls"

Item {
    Column {
        spacing: window.height * 0.05
        Repeater {
            model: mainMenu.model
            delegate: ControlsPack {
                anchors.horizontalCenter: parent.horizontalCenter
                function controlsAction(index) { controller.startGameButtons(index) }
            }
        }
    }
}
