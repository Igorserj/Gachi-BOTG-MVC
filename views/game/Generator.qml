import QtQuick 2.15

Item {
    WorkerScript {
        id: lvlGenScript
        source: `${routes.controllers[0].root}/gameGeneratorController.mjs`
        onMessage: { controller.actionMainGUI() }
        Component.onCompleted: sendMessage({ 'seed': seed, 'model': mapModel })
    }
}
