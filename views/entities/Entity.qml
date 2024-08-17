import QtQuick 2.15
import "../../models/game"
import "../../controllers/entities/entityController.js" as Controller

Item {
    property alias color: entity.color
    property alias entity: entity
    property alias posX: entity.posX
    property alias posY: entity.posY
    property alias inventory: entityInventoryModel
    property double distance: 50
    property double baseAnimationDuration: 250

    property bool allowUp: false
    property bool allowDown: false
    property bool allowLeft: false
    property bool allowRight: false

    property bool active: false
    property bool noClip: false

    property int entityIndex: index

    height: 1 / 11 * window.height
    width: height

    Rectangle {
        id: entity
        width: parent.width
        height: parent.height
        readonly property var controller: Controller
        property int posX: positionX
        property int posY: positionY
        property string eName: name
        property int hp: health
        property int maxHp: maxHealth
        property string facing: 'east'

        property int sta: stamina
        property int maxSta: maxStamina

        SequentialAnimation {
            id: moveLeftAnimation
            PropertyAction {
                target: entity
                property: "facing"
                value: 'west'
            }
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
            PropertyAction {
                target: entity
                property: "facing"
                value: 'east'
            }
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
            PropertyAction {
                target: entity
                property: "facing"
                value: 'north'
            }
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
            PropertyAction {
                target: entity
                property: "facing"
                value: 'south'
            }
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y + distance
                duration: baseAnimationDuration
            }
            onStopped: if (allowDown) moveDownAnimation.start()
        }

        SequentialAnimation {
            id: runAnimation
            PropertyAction {
                 target: entity.parent
                 property: "distance"
                 value: distance * 1.5
            }
            PropertyAnimation {
                target: entity
                property: "sta"
                to: entity.sta - 5
                duration: baseAnimationDuration
            }
            onStopped: distance /= 1.5
        }
    }
    EntityInventoryModel {
        id: entityInventoryModel
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
