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
        onClicked: if (!!cBuffer.fromModel) {
                       hero.controller.dropItemMessage(hero,
                                                cBuffer.fromModel.get(cBuffer.fromItem.position[0]).metadataList.get(cBuffer.fromItem.position[1]),
                                                cBuffer.fromModel.get(cBuffer.fromItem.position[0]).cellList.get(cBuffer.fromItem.position[1]),
                                                dropScript)
                   }
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

    WorkerScript {
        id: dropScript
        source: `${routes.controllers[0].entities}/dropItemController.mjs`
        onMessage: (messageObject)=> hero.controller.dropItem(messageObject, cBuffer, controller)
    }
}
