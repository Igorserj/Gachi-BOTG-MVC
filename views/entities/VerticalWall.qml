import QtQuick 2.15
import "../../controllers/entities/wallController.js" as Controller

Entity {
    id: wall
    state: itemState
    states: [
        State {
            name: "default"
            PropertyChanges {
                target: entity
                color: "gray"
                width: 10 * scene.width / 640
                height: scene.height
            }
        },
        State {
            name: "passage"
            PropertyChanges {
                target: entity
                color: "transparent"
                width: 10 * scene.width / 640
                height: scene.height
            }
        },
        State {
            name: "door"
            PropertyChanges {
                target: entity
                color: "brown"
                width: 10 * scene.width / 640
                height: scene.height / 5
            }
        }
    ]

    onActiveChanged: Controller.wallAction(hero, state, type)
}
