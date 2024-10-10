import QtQuick 2.15

Item {
    id: cellsItem
    readonly property int i: index
    width: (0.065 * window.height + 0.01 * window.height * (columns - 1) / columns) * columns
    height: (0.065 * window.height + 0.01 * window.height * (Math.ceil(metadataList.count / columns) - 1) / Math.ceil(metadataList.count / columns)) * Math.ceil(metadataList.count / columns)
    Component.onCompleted: controller.cellsAlignments(index, this, invType)

    MouseArea {
        anchors.fill: parent
    }
    Repeater {
        model: metadataList
        delegate: Item {
            readonly property double frameSize: 0.075 * window.height
            width: frameSize
            height: frameSize
            x: index + 1 > Math.floor(metadataList.count / columns) * columns ? ((frameSize * columns) - (width * (metadataList.count - (Math.floor(metadataList.count / columns) * columns)))) / 2 + (metadataList.count - (Math.floor(metadataList.count / columns) * columns) - (metadataList.count - (index))) * width : (index % columns) * width
            y: Math.floor(index / columns) * height
            Cell {}
        }
    }

    Connections {
        enabled: invType === 'Enemy'
        target: hero
        function onXChanged() {
            controller.addLoaderUnload()
        }
        function onYChanged() {
            controller.addLoaderUnload()
        }
    }
}

