import QtQuick
import "../../controllers/entityController.js" as Controller

Rectangle {
    id: entity
    property double deltaX: 50 / 250 / 0.06
    property double deltaY: 50 / 250 / 0.06
    readonly property var controller: Controller
    readonly property double animationDuration: 1 / 0.06
    height: 1 / 11 * window.height
    width: height

    SequentialAnimation {
        id: moveLeftAnimation
        PropertyAnimation {
            target: entity
            property: "x"
            to: entity.x - deltaX
            duration: animationDuration
        }
        ScriptAction {
            script: {
                cycleMoveLeftAnimation.start()
            }
        }
    }
    SequentialAnimation {
        id: cycleMoveLeftAnimation
        PropertyAnimation {
            target: entity
            property: "x"
            to: entity.x - deltaX
            duration: animationDuration
        }
        ScriptAction {
            script: {
                moveLeftAnimation.start()
            }
        }
    }

    SequentialAnimation {
        id: moveRightAnimation
        PropertyAnimation {
            target: entity
            property: "x"
            to: entity.x + deltaX
            duration: animationDuration
        }
        ScriptAction {
            script: {
                cycleMoveRightAnimation.start()
            }
        }
    }
    SequentialAnimation {
        id: cycleMoveRightAnimation
        PropertyAnimation {
            target: entity
            property: "x"
            to: entity.x + deltaX
            duration: animationDuration
        }
        ScriptAction {
            script: {
                moveRightAnimation.start()
            }
        }
    }

    SequentialAnimation {
        id: moveUpAnimation
        PropertyAnimation {
            target: entity
            property: "y"
            to: entity.y - deltaY
            duration: animationDuration
        }
        ScriptAction {
            script: {
                cycleMoveUpAnimation.start()
            }
        }
    }
    SequentialAnimation {
        id: cycleMoveUpAnimation
        PropertyAnimation {
            target: entity
            property: "y"
            to: entity.y - deltaY
            duration: animationDuration
        }
        ScriptAction {
            script: {
                moveUpAnimation.start()
            }
        }
    }

    SequentialAnimation {
        id: moveDownAnimation
        PropertyAnimation {
            target: entity
            property: "y"
            to: entity.y + deltaY
            duration: animationDuration
        }
        ScriptAction {
            script: {
                cycleMoveDownAnimation.start()
            }
        }
    }
    SequentialAnimation {
        id: cycleMoveDownAnimation
        PropertyAnimation {
            target: entity
            property: "y"
            to: entity.y + deltaY
            duration: animationDuration
        }
        ScriptAction {
            script: {
                moveDownAnimation.start()
            }
        }
    }
}
