function entityChooser(type) {
    if (type === "Hero") {
        return `${routes.views[0].entities}/Hero.qml`
    } else if (type === "Enemy") {
        return `${routes.views[0].entities}/Enemy.qml`
    } else if (type === "Wall top" || type === "Wall bottom") {
        return `${routes.views[0].entities}/HorizontalWall.qml`
    } else if (type === "Wall left" || type === "Wall right") {
        return `${routes.views[0].entities}/VerticalWall.qml`
    }
}

function entityPositioner(entity, type) {
    if (type === "Hero") {
        entity.x = (scene.width - entity.width) / 2
        entity.y = (scene.height - entity.height) / 2
    } else if (type === "Wall top") {
        entity.x = 0
        entity.y = Qt.binding(() => -entity.height / 2)
    } else if (type === "Wall bottom") {
        entity.x = 0
        entity.y = Qt.binding(() => scene.height - entity.height / 2)
    } else if (type === "Wall left") {
        entity.x = Qt.binding(() => -entity.width / 2)
        entity.y = 0
    } else if (type === "Wall right") {
        entity.x = Qt.binding(() => scene.width - entity.width / 2)
        entity.y = 0
    } else if (type === "Enemy") {
        entity.x = scene.width / 7
        entity.y = scene.height / 7
    }
}
