function entityChooser(type) {
    if (type === "Hero") {
        return routes.views[0].entities + "/Hero.qml"
    }
    else if (type === "Enemy") {
        return routes.views[0].entities + "/Enemy.qml"
    }
}
