import QtQuick 2.15
import '../../controllers/game/builderController.js' as Controller

Item {
    WorkerScript {
        id: lvlGenScript
        source: `${routes.controllers.game}/gameGeneratorController.js`
        onMessage: messageObject => {
                       Controller.levelBuild(messageObject.items[0], messageObject.walls[0])
                       controller.actionMainGUI()
                       controller.scenePositioner()
                   }
        Component.onCompleted: sendMessage({ 'seed': seed, 'model': mapModel })
    }
}
