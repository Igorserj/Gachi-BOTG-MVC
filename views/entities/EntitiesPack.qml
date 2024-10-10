import QtQuick 2.15
import "../../controllers/entities/entitiesPackController.js" as Controller

Repeater {
    id: entitiesPack
    property var controller: Controller
    model: levelModel
    delegate: Loader {
        id: loader
        source: Controller.entityChooser(type)
        onLoaded: {
            Controller.entityPositioner(item.entity, type, positionX, positionY, deltaX, deltaY)
            Controller.entityInventoryPopulation(item, type, name, cells, metadata, effects)
        }
    }
}
