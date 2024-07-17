import QtQuick 2.15

ListModel {

    ListElement {
        name: "Hero Health"
        type: "Scaler"
        units: "HP"
        value: 101
        maxValue: 100
    }
    ListElement {
        name: "Hero Stamina"
        type: "Scaler"
        units: "SP"
        value: 99
        maxValue: 100
    }
}
