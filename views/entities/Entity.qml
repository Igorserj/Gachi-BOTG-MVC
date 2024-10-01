import QtQuick 2.15
import "../../models/entity"
import "../../controllers/entities/entityController.js" as Controller

Item {
    property alias color: entity.color
    property alias entity: entity
    property alias posX: entity.posX
    property alias posY: entity.posY
    property alias inventory: entityInventoryModel
    property alias effectsList: entityEffectsModel
    property double dist: entity.dist
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

    EntityProps {
        id: props
    }

    Rectangle {
        id: entity
        width: parent.width
        height: parent.height
        readonly property var controller: Controller
        property int posX: typeof(positionX) !== 'undefined' ? positionX : props.positionX
        property int posY: typeof(positionY) !== 'undefined' ? positionY : props.positionY
        property string eName: typeof(name) !== 'undefined' ? name : props.name

        property double hp: typeof(health) !== 'undefined' ? health : props.health
        property int maxHp: typeof(maxHealth) !== 'undefined' ? maxHealth : props.maxHealth
        property int hpReg: typeof(hpRegen) !== 'undefined' ? hpRegen : props.hpRegen

        property int sta: typeof(stamina) !== 'undefined' ? stamina : props.stamina
        property int maxSta: typeof(maxStamina) !== 'undefined' ? maxStamina : props.maxStamina
        property int staReg: typeof(staminaRegen) !== 'undefined' ? staminaRegen : props.staminaRegen

        property double atk: typeof(attack) !== 'undefined' ? attack : props.attack
        property int atkSpd: typeof(attackSpeed) !== 'undefined' ? attackSpeed : props.attackSpeed
        property int atkRng: typeof(attackRange) !== 'undefined' ? attackRange : props.attackRange

        property int def: typeof(defense) !== 'undefined' ? defense : props.defense
        property int dist: typeof(distance) !== 'undefined' ? distance : props.distance
        property string face: typeof(facing) !== 'undefined' ? facing : props.facing

        SequentialAnimation {
            id: moveLeftAnimation
            PropertyAction {
                target: entity
                property: "face"
                value: 'west'
            }
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x - dist
                duration: baseAnimationDuration
            }
            onStopped: if (allowLeft) moveLeftAnimation.start()
        }

        SequentialAnimation {
            id: moveRightAnimation
            PropertyAction {
                target: entity
                property: "face"
                value: 'east'
            }
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x + dist
                duration: baseAnimationDuration
            }
            onStopped: if (allowRight) moveRightAnimation.start()
        }

        SequentialAnimation {
            id: moveUpAnimation
            PropertyAction {
                target: entity
                property: "face"
                value: 'north'
            }
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y - dist
                duration: baseAnimationDuration
            }
            onStopped: if (allowUp) moveUpAnimation.start()
        }

        SequentialAnimation {
            id: moveDownAnimation
            PropertyAction {
                target: entity
                property: "face"
                value: 'south'
            }
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y + dist
                duration: baseAnimationDuration
            }
            onStopped: if (allowDown) moveDownAnimation.start()
        }

        SequentialAnimation {
            id: runAnimation
            PropertyAction {
                 target: entity.parent
                 property: "dist"
                 value: dist * 1.5
            }
            PropertyAnimation {
                target: entity
                property: "sta"
                to: entity.sta - 5
                duration: baseAnimationDuration
            }
            onStopped: dist /= 1.5
        }
    }
    EntityInventoryModel {
        id: entityInventoryModel
    }

    EntityEffectsModel {
        id: entityEffectsModel
    }

    EffectsGenerator {}

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
