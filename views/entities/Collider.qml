import QtQuick 2.15
import "../../controllers/entities/colliderDetectController.js" as Controller

Rectangle {
    color: "transparent"
    border.width: 1
    border.color: showBoundaries ? "lightgreen" : "transparent"
    Component.onCompleted: colliderModel.append({ 'item': this, 'type': type, 'index': index, 'posX': positionX, 'posY': positionY, 'interact': interact })
    onXChanged: Controller.collistionDetectScript(entity, distance, noClip, posX, posY, colliderModel)
    onYChanged: Controller.collistionDetectScript(entity, distance, noClip, posX, posY, colliderModel)
}
