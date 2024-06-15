import QtQuick 2.15
import "../controls"

Item {
    property int mapLayer: 0
    Repeater {
        id: mapRep
        model: addModel.get(mapLayer).items
        Rectangle {
            width: controller.mapElementGetWidth(type, mapLayer, identifier)
            height: controller.mapElementGetHeight(type, mapLayer, identifier)
            x: controller.mapElementGetX(mapLayer, index)
            y: controller.mapElementGetY(mapLayer, index)
            border.width: type === "horizontal pass" || type === "vertical pass" ? 0 : 1
            border.color: "black"
            color: type === "horizontal pass" || type === "vertical pass" ? "black" : "transparent"
            radius: type === "entry" || type === "exit" || type === "block" || type === "horizontal pass" || type === "vertical pass" ? 0 : height / 3
            Text {
                anchors.centerIn: parent
                text: controller.mapElementGetText(type, mapLayer, identifier)
            }
        }
    }

    Rectangle {
        width: parent.width * 0.1
        height: parent.height * 0.1
        anchors.bottom: parent.bottom
        color: "gray"
        MouseArea {
            anchors.fill: parent
            onClicked: ++mapLayer
        }
    }
}
