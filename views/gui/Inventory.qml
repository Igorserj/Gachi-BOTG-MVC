import QtQuick 2.15
import "../controls"

Item {

    CellBuffer {
        id: cBuffer
    }

    MouseArea {
        id: inventoryArea
        anchors.fill: parent
        hoverEnabled: true
        onEntered: controller.cellBufferMovement(Qt.binding(()=>inventoryArea.mouseX), Qt.binding(()=>inventoryArea.mouseY), cBuffer)
    }

    Repeater {
        model: addModel
        delegate: Repeater {
            property var invType: modelData.invType
            property var inv: modelData.inv
            model: inv
            delegate: ControlsPack {}
        }
    }
}
