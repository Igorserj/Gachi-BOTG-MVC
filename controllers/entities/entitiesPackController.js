function entityChooser(type) {
    if (type === 'Hero') {
        return `${routes.views[0].entities}/Hero.qml`
    } else if (type === 'Enemy') {
        return `${routes.views[0].entities}/Enemy.qml`
    } else if (type === 'Wall top' || type === 'Wall bottom') {
        return `${routes.views[0].entities}/HorizontalWall.qml`
    } else if (type === 'Wall left' || type === 'Wall right') {
        return `${routes.views[0].entities}/VerticalWall.qml`
    } else if (type === 'Corridor') {
        return `${routes.views[0].entities}/Corridor.qml`
    }
}

function entityPositioner(entity, type, positionX, positionY) {
    if (type === 'Hero') {
        entity.x = (scene.width - entity.width) / 2
        entity.y = (scene.height - entity.height) / 2
    } else if (type === 'Wall top') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Wall bottom') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * (positionY + 1) - entity.height)
    } else if (type === 'Wall left') {
        entity.x = Qt.binding(() => scene.width * positionX)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Wall right') {
        entity.x = Qt.binding(() => scene.width * (positionX + 1) - entity.width)
        entity.y = Qt.binding(() => scene.height * positionY)
    } else if (type === 'Enemy') {
        entity.x = scene.width / 7
        entity.y = scene.height / 7
    } else if (type === 'Corridor') {
        entity.x = entity.width * positionX
        entity.y = entity.height * positionY
    }
}
