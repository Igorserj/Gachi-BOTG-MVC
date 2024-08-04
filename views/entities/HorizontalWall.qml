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
                width: scene.width
                height: 10 * scene.height / 360
            }
        },
        State {
            name: "passage"
            PropertyChanges {
                target: entity
                color: "transparent"
                width: scene.width
                height: 10 * scene.height / 360
            }
        },
        State {
            name: "door"
            PropertyChanges {
                target: entity
                color: "brown"
                width: scene.width / 5
                height: 10 * scene.height / 360
            }
        }
    ]

    onActiveChanged: Controller.wallAction(hero, state, type)
}
