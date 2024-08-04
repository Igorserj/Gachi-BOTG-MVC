import QtQuick 2.15
import "../../models/game"

Entity {
    color: "yellow"
    Component.onCompleted: {
        hero = entity
    }
    onActiveChanged: entity.controller.lootAction(entity)
}
