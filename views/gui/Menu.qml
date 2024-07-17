import QtQuick 2.15
import "../controls"

Item {
    Column {
        spacing: window.height * 0.025
        Repeater {
            model: game.model
            delegate: ControlsPack {
                function controlsAction(index) { controller.menuButtons(index) }
            }
        }
    }
}
