import QtQuick
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
    height: 1 / 11 * window.height
    width: height

    Rectangle {
        id: entity
        width: parent.width
        height: parent.height
        readonly property var controller: Controller
        property string type: type
        property int index: index

        SequentialAnimation {
            id: moveLeftAnimation
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x - deltaX
                duration: durationX
            }
            // ScriptAction {
            //     script: {
            //         cycleMoveLeftAnimation.start()
            //     }
            // }
        }

        // SequentialAnimation {
        //     id: cycleMoveLeftAnimation
        //     PropertyAnimation {
        //         target: entity
        //         property: "x"
        //         to: entity.x - deltaX
        //         duration: animationDuration
        //     }
        //     ScriptAction {
        //         script: {
        //             moveLeftAnimation.start()
        //         }
        //     }
        // }
        SequentialAnimation {
            id: moveRightAnimation
            PropertyAnimation {
                target: entity
                property: "x"
                to: entity.x + deltaX
                duration: durationX
            }
            // ScriptAction {
            //     script: {
            //         cycleMoveRightAnimation.start()
            //     }
            // }
        }

        // SequentialAnimation {
        //     id: cycleMoveRightAnimation
        //     PropertyAnimation {
        //         target: entity
        //         property: "x"
        //         to: entity.x + deltaX
        //         duration: animationDuration
        //     }
        //     ScriptAction {
        //         script: {
        //             moveRightAnimation.start()
        //         }
        //     }
        // }
        SequentialAnimation {
            id: moveUpAnimation
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y - deltaY
                duration: durationY
            }
            // ScriptAction {
            //     script: {
            //         cycleMoveUpAnimation.start()
            //     }
            // }
        }

        // SequentialAnimation {
        //     id: cycleMoveUpAnimation
        //     PropertyAnimation {
        //         target: entity
        //         property: "y"
        //         to: entity.y - deltaY
        //         duration: animationDuration
        //     }
        //     ScriptAction {
        //         script: {
        //             moveUpAnimation.start()
        //         }
        //     }
        // }
        SequentialAnimation {
            id: moveDownAnimation
            PropertyAnimation {
                target: entity
                property: "y"
                to: entity.y + deltaY
                duration: durationY
            }
            // ScriptAction {
            //     script: {
            //         cycleMoveDownAnimation.start()
            //     }
            // }
        }
        // SequentialAnimation {
        //     id: cycleMoveDownAnimation
        //     PropertyAnimation {
        //         target: entity
        //         property: "y"
        //         to: entity.y + deltaY
        //         duration: animationDuration
        //     }
        //     ScriptAction {
        //         script: {
        //             moveDownAnimation.start()
        //         }
        //     }
        // }
    }
    Collider {
        id: collider
        anchors.fill: entity
    }

    WorkerScript {
        id: collisionDetectScript
        source: `${routes.controllers[0].root}/entityColliderController.mjs`
        onMessage: messageObject => {
                       const direction = messageObject.direction

                       if (direction === "up") {
                           deltaY = messageObject.deltaY
                           durationY = messageObject.durationY
                           Controller.moveUp()
                       } else if (direction === "down") {
                           deltaY = messageObject.deltaY
                           durationY = messageObject.durationY
                           Controller.moveDown()
                       } else if (direction === "left") {
                           deltaX = messageObject.deltaX
                           durationX = messageObject.durationX
                           Controller.moveLeft()
                       } else if (direction === "right") {
                           deltaX = messageObject.deltaX
                           durationX = messageObject.durationX
                           Controller.moveRight()
                       }
                   }
    }
}
