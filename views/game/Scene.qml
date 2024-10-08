import QtQuick 2.15
import "../../models/game"
import "../entities"

Item {
    id: scene
    width: window.height * 4 / 3 > window.width ? window.width : window.height * 4 / 3
    height: (window.width / 4 * 3 > window.height ? window.height : window.width / 4 * 3) - window.height * 0.15
    Rectangle {
        anchors.fill: parent
        color: "black"
    }

    EntitiesPack {}

    ColliderModel {
        id: colliderModel
    }
}
