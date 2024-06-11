import QtQuick 2.15
import "../../models/game"
import "../entities"

Item {
    width: window.height * 4 / 3 > window.width ? window.width : window.height * 4 / 3
    height: (window.width / 4 * 3 > window.height ? window.height : window.width / 4 * 3) - window.height * 0.075
    x: (window.width - width) / 2
    y: (window.height - height) / 2 + window.height * 0.075
    Rectangle {
        anchors.fill: parent
        color: "black"
    }

    EntitiesPack {
        anchors.fill: parent
    }

    EntityModel {
        id: entityModel
    }
}
