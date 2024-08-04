import QtQuick 2.15
import "../controls"
import "../../controllers/gui/debugController.js" as Controller

Item {
    Column {
        spacing: window.height * 0.05
        Repeater {
            model: game.model
            delegate: ControlsPack {
                function controlsAction(index) { Controller.actionChoose(index) }
            }
        }
    }
}
