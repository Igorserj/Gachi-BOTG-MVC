import QtQuick 2.15

Entity {
    color: "gray"
    Component.onCompleted: {
        scene.x = Qt.binding(() => Math.floor((entity.x + entity.width / 2) / scene.width) * -scene.width) //Qt.binding(() => (-entity.x + window.width / 2))
        scene.y = Qt.binding(() => Math.floor((entity.y + entity.height / 2) / scene.height) * -scene.height - (scene.height - window.height)) //Qt.binding(() => (-entity.y + window.height / 2))
        hero = entity
    }
}
