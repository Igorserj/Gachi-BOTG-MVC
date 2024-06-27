import QtQuick 2.15
import "../../controllers/entityController.js" as Controller

Item {
    property alias color: entity.color
    property alias entity: entity
    property double deltaX: 0
    property double deltaY: 0
    property double distance: 50
    property double durationX: 0
    property double durationY: 0
    property double baseAnimationDuration: 250

    property bool allowUp: false
    property bool allowDown: false
    property bool allowLeft: false
    property bool allowRight: false

    property bool noClip: false

    height: 1 / 11 * window.height
    width: height

    Rectangle {
        id: entity
        width: parent.width
        height: parent.height
        readonly property var controller: Controller
        property string type: type
        property int index: index
        property int posX: 0
        property int posY: 0

        SequentialAnimation {
            id: moveLeftAnimation
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x - deltaX
                duration: durationX
            }
            onFinished: if (allowLeft) Controller.collisionsDetect("left")
        }

        SequentialAnimation {
            id: moveRightAnimation
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x + deltaX
                duration: durationX
            }
            onFinished: if (allowRight) Controller.collisionsDetect("right")
        }

        SequentialAnimation {
            id: moveUpAnimation
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y - deltaY
                duration: durationY
            }
            onFinished: if (allowUp) Controller.collisionsDetect("up")
        }

        SequentialAnimation {
            id: moveDownAnimation
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y + deltaY
                duration: durationY
            }
            onFinished: if (allowDown) Controller.collisionsDetect("down")
        }
    }
    Collider {
        id: collider
        anchors.fill: entity
    }

    WorkerScript {
        id: collisionDetectScript
        source: `${routes.controllers[0].root}/entityColliderController.mjs`
        onMessage: messageObject => Controller.collisionsDetectMessage(messageObject)
    }
}
