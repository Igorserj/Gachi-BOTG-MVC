import QtQuick 2.15
import "../controls"
import "../../controllers/gui/debugController.js" as Controller

Item {
    Repeater {
        model: game.model
        delegate: ControlsPack {
            function controlsAction(index) { Controller.actionChoose(index) }
        }
    }
}
