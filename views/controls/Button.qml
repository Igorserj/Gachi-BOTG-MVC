import QtQuick 2.15

Rectangle {
    height: window.height * 0.1
    width: btnLabel.contentWidth
    color: "gray"
    function clickAction(params) {}

    Text {
        id: btnLabel
        height: parent.height
        fontSizeMode: Text.Fit
        font.pixelSize: height / 1.5
        text: name
        color: "white"
        // Component.onCompleted: console.log(model)
    }
    MouseArea {
        id: btnArea
        anchors.fill: parent
        onClicked: clickAction(index)
    }
}
