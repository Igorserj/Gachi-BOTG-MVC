import QtQuick 2.15
import "../../controllers/controls/controlsPackController.js" as Pack

Item {
    id: pack
    readonly property int thisIndex: index
    width: loader.width
    height: loader.height
    // function controlsAction(index) {}

    Loader {
        id: loader
        sourceComponent: Pack.componentDetermine(type)
        onLoaded: {
            width = item.width
            height = item.height
        }
    }

    Component {
        id: button
        Button {
            function clickAction(index) { controlsAction(thisIndex) }
        }
    }
    Component {
        id: slider
        Slider {}
    }
    Component {
        id: dropdown
        Dropdown {}
    }
    Component {
        id: scaler
        Scaler {}
    }
    Component {
        id: cells
        Cells {}
    }

    Component {
        id: optionsList
        OptionsList {}
    }
}
