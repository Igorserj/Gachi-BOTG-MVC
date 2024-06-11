import QtQuick 2.15
import "../../controllers/controlsSlider.js" as Controller

Item {
    id: sliderItem
    width: height * 5 / 2
    height: window.height * 0.1

    Rectangle {
        y: (parent.height - height) / 2
        height: window.height * 0.05
        width: height * 5
        color: "gray"
    }

    Rectangle {
        id: handle
        height: window.height * 0.1
        width: height
        radius: height / 2
        color: "gray"
    }

    MouseArea {
        anchors.fill: parent
        drag.target: handle
        drag.axis: Drag.XAxis
        drag.maximumX: sliderItem.width - handle.width
        drag.minimumX: 0
    }
}
