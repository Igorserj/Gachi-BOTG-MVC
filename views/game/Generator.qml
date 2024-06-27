import QtQuick 2.15
import '../../controllers/generatorController.js' as Controller

Item {
    WorkerScript {
        id: lvlGenScript
        source: `${routes.controllers[0].root}/gameGeneratorController.mjs`
        onMessage: messageObject => {
                       Controller.levelBuild(messageObject.items[0], messageObject.walls[0])
                       controller.actionMainGUI()
        }
        Component.onCompleted: sendMessage({ 'seed': seed, 'model': mapModel })
    }
}
