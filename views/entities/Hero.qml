import QtQuick 2.15
import "../../models/game"

Entity {
    color: "yellow"
    Component.onCompleted: {
        scene.x = Math.floor((entity.x + entity.width / 2) / scene.width) * -scene.width
        scene.y = Math.floor((entity.y + entity.height / 2) / scene.height) * -scene.height - (scene.height - window.height)
        hero = entity
    }
    onActiveChanged: entity.controller.lootAction(entity)
}
