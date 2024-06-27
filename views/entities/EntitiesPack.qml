import QtQuick 2.15
import "../../controllers/entitiesPackController.js" as Controller

Repeater {
    id: entitiesPack
    property var controller: Controller
    model: levelModel
    delegate: Loader {
        id: loader
        source: Controller.entityChooser(type)
        onLoaded: {
            Controller.entityPositioner(item.entity, type, positionX, positionY)
        }
    }
}
