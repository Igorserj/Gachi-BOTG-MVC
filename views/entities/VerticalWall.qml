import QtQuick 2.15
import "../../controllers/entities/wallController.js" as Controller

Entity {
    width: 10 * scene.width / 640
    height: scene.height
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
