import QtQuick 2.15

Rectangle {
    property var fromItem
    property var toItem
    property var fromModel
    property var toModel

    onFromItemChanged: {
        if (!!fromItem) {
            visible = true
        }
        else {
            visible = false
        }
    }
    visible: false
    color: "#77888888"
    width: 0.065 * window.height
    height: 0.065 * window.height
}
