import QtQuick 2.15

Entity {
    color: "red"

    onActiveChanged: entity.controller.lootAction(hero, entity)
}
