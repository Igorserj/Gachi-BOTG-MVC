import QtQuick 2.15
import "../../controllers/entities/wallController.js" as Controller

Entity {
    width: scene.width
    height: 10 * scene.height / 360
    state: itemState
    states: [
        State {
            name: "default"
            PropertyChanges {
                target: entity
                color: "gray"
            }
        },
        State {
            name: "passage"
            PropertyChanges {
                target: entity
                color: "transparent"
            }
        }
    ]
    onActiveChanged: Controller.wallAction(hero)
}
