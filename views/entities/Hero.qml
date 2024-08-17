import QtQuick 2.15
import "../../models/game"

Entity {
    color: "yellow"
    Component.onCompleted: {
        hero = entity
    }
    onActiveChanged: entity.controller.lootAction(entity)

    Connections {
        target: entity
        function onStaChanged() {
            game.controller.updateMainGUI('sta')
        }
        function onHpChanged() {
            game.controller.updateMainGUI('hp')
        }
    }
}
