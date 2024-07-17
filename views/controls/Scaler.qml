import QtQuick 2.15
import "../../controllers/controls/scalerController.js" as Controller

Rectangle {
    property color fillColor: Controller.colorFilling()
    property var values: Controller.calcValue()
    width: height * 5 / 2
    height: window.height * 0.1
    color: "gray"

    Item {
        height: parent.height * 0.8
        width: parent.width - parent.height * 0.2
        anchors.centerIn: parent

        Rectangle {
            anchors.fill: parent
            color: fillColor
        }

        Rectangle {
            anchors.fill: parent
            color: "#44000000"
        }

        Rectangle {
            height: parent.height
            width: parent.width * values.value
            color: fillColor
        }

        Rectangle {
            width: parent.width * 0.1 * values.surplus
            height: parent.height
            color: "yellow"
            x: parent.width - width
        }

        Text {
            anchors.fill: parent
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            font.pixelSize: height / 2.5
            fontSizeMode: Text.Fit
            color: "gray"
            font.bold: true
            text: `${value} / ${maxValue}`
        }
    }
}
