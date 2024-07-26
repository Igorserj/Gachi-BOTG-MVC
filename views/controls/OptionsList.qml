import QtQuick 2.15

Item {
    id: optionsListItems
    width: header.width > footer.width ? header.width : footer.width
    height: header.height + footer.height
    state: "collapsed"

    Rectangle {
        anchors.fill: parent
        color: "gray"
    }
    Column {
        Rectangle {
            id: header
            height: window.height * 0.1
            width: label.contentWidth
            color: "gray"

            Text {
                id: label
                height: parent.height
                fontSizeMode: Text.Fit
                font.pixelSize: height / 1.5
                text: name
                color: "white"
            }
        }
        Column {
            id: footer
            Repeater {
                id: footerRep
                model: options
                delegate: Button {
                    function clickAction() {
                        game.controller.optionInteract(entity)
                    }
                }
            }
        }
    }
}
