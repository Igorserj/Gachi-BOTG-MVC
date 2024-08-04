import QtQuick 2.15

Entity {
    width: 10
    height: 10
    color: "#777755"
    onActiveChanged: entity.controller.lootAction(entity)
}
