import QtQuick 2.15

Rectangle {
    color: "transparent"
    border.width: 1
    border.color: "lightgreen"
    Component.onCompleted: colliderModel.append({ item: this, type: type, index: index })
}
