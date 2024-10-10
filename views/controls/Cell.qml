import QtQuick 2.15
import "../../controllers/controls/cellController.js" as Controller

Rectangle {
    id: cellRect
    width: 0.065 * window.height
    height: 0.065 * window.height
    clip: true
    color: "gray"
    Rectangle {
        clip: true
        width: parent.width * 0.85
        height: parent.height * 0.85
        x: (parent.width - width) / 2
        y: (parent.height - height) / 2
        color: "transparent"
        Text {
            anchors.fill: parent
            font.pixelSize: height / 2
            fontSizeMode: Text.VerticalFit
            text: name
            color: "white"
            verticalAlignment: Text.AlignVCenter
        }
    }
    MouseArea {
        anchors.fill: parent
        hoverEnabled: true
        onEntered: controller.cellMovement(Qt.binding(() => mouseX + cellRect.parent.x + cellsItem.x), Qt.binding(() => mouseY + cellRect.parent.y + cellsItem.y), cBuffer, effectsList.get(index), cellList.get(index).type, metadataList.get(index).type)
        onExited: controller.cellStopMovement(cBuffer)
        onClicked: Controller.cell()
    }
}
