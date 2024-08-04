import QtQuick 2.15
import "../controls"

Item {

    Repeater {
        id: optionsRepeater
        model: addModel
        delegate: ControlsPack {}
    }
    Connections {
        target: hero
        function onXChanged() {
            game.controller.addLoaderUnload()
        }
        function onYChanged() {
            game.controller.addLoaderUnload()
        }
    }
}
