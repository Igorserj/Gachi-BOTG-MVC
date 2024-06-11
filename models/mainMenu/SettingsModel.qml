import QtQuick 2.15

ListModel {

    ListElement {
        name: "Window size"
        type: "Slider"
    }
    ListElement {
        name: "Render resolution"
        type: "Slider"
    }
    ListElement {
        name: "Shadows level"
        type: "Dropdown"
        options: [
            ListElement { name: "Disabled" },
            ListElement { name: "Shadows from objects" },
            ListElement { name: "All shadows" }
        ]
    }
    ListElement {
        name: "Language"
        type: "Dropdown"
        options: [
            ListElement { name: "Українська" },
            ListElement { name: "Русский" },
            ListElement { name: "English" }
        ]
    }
    ListElement {
        name: "Back"
        type: "Button"
    }
}
