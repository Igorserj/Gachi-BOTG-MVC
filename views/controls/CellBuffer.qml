import QtQuick 2.15

Rectangle {
    id: buffer
    property var fromItem
    property var toItem
    property var fromModel
    property var toModel
    width: 0.065 * window.height
    height: 0.065 * window.height
    state: "nothing"
    states: [
        State {
            name: "description"
            PropertyChanges {
                target: buffer
                visible: true
                color: "#FFFFFF"
            }
        },
        State {
            name: "movement"
            PropertyChanges {
                target: buffer
                visible: true
                color: "#77888888"
            }
        },
        State {
            name: "nothing"
            PropertyChanges {
                target: buffer
                visible: false
                color: "#000000"
            }
        }
    ]
}
