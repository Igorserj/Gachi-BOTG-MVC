import QtQuick
import "../../controllers/entitiesPackController.js" as Controller

Repeater {
    model: entityModel
    delegate: Loader {
        id: loader
        source: Controller.entityChooser(type)
        onLoaded: {width = item.width; height = item.height}
    }
}
