import QtQuick
import "../../controllers/entitiesPackController.js" as Controller

Repeater {
    id: entitiesPack
    property var controller: Controller
    model: entityModel
    delegate: Loader {
        id: loader
        source: Controller.entityChooser(type)
        onLoaded: {
            Controller.entityPositioner(item.entity, type)
        }
    }
}
