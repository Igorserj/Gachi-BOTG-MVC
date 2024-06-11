import QtQuick 2.15
import "../../controllers/controlsDropdownController.js" as Controller

Item {
    id: dropdownItem
    width: header.width > footer.width ? header.width : footer.width
    height: header.height + footer.height
    state: "collapsed"

    Rectangle {
        anchors.fill: parent
        color: "gray"
    }
    Column {
        Button {
            id: header
            function clickAction(index) { Controller.dropdown() }
        }
        Column {
            id: footer
            Repeater {
                id: footerRep
                model: []
                delegate: Button {}
            }
        }
    }
}
