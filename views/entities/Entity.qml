import QtQuick 2.15
import "../../controllers/entities/entityController.js" as Controller

Item {
    property alias color: entity.color
    property alias entity: entity
    property double distance: 50
    property double baseAnimationDuration: 250

    property bool allowUp: false
    property bool allowDown: false
    property bool allowLeft: false
    property bool allowRight: false

    property bool active: false
    property bool noClip: false

    height: 1 / 11 * window.height
    width: height

    Rectangle {
        id: entity
        width: parent.width
        height: parent.height
        readonly property var controller: Controller
        // property string type: type
        property int entityIndex: index
        property int posX: 0
        property int posY: 0
        // property bool interactive: itemInteract

        SequentialAnimation {
            id: moveLeftAnimation
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x - distance
                duration: baseAnimationDuration
            }
            onStopped: if (allowLeft) moveLeftAnimation.start()
        }

        SequentialAnimation {
            id: moveRightAnimation
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x + distance
                duration: baseAnimationDuration
            }
            onStopped: if (allowRight) moveRightAnimation.start()
        }

        SequentialAnimation {
            id: moveUpAnimation
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y - distance
                duration: baseAnimationDuration
            }
            onStopped: if (allowUp) moveUpAnimation.start()
        }

        SequentialAnimation {
            id: moveDownAnimation
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y + distance
                duration: baseAnimationDuration
            }
            onStopped: if (allowDown) moveDownAnimation.start()
        }
    }
    Collider {
        id: collider
        anchors.fill: entity
    }

    WorkerScript {
        id: interactionDetectScript
        source: `${routes.controllers[0].entities}/interactionController.mjs`
        onMessage: messageObject => Controller.interactionDetectMessage(messageObject)
    }
}
