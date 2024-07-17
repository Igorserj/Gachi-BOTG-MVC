import QtQuick 2.15
import "../../controllers/entities/colliderDetectController.js" as Controller

Rectangle {
    color: "transparent"
    border.width: 1
    border.color: "lightgreen"
    Component.onCompleted: colliderModel.append({ 'item': this, 'type': type, 'index': index, 'posX': positionX, 'posY': positionY, 'interact': interact })
    onXChanged: Controller.collistionDetectScript(entity, distance, noClip, entity.posX, entity.posY, colliderModel)
    onYChanged: Controller.collistionDetectScript(entity, distance, noClip, entity.posX, entity.posY, colliderModel)
}
