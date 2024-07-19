import QtQuick 2.15
import "../controls"

Item {

    Repeater {
        id: optionsRepeater
        model: addModel
        delegate: ControlsPack {}
    }
}
