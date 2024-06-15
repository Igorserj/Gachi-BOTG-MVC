import QtQuick 2.15

ListModel {
    ListElement {
        type: "Hero"
        name: "Semen"
        health: 100
        stamina: 100
        maxHealth: 100
        maxStamina: 100
    }

    ListElement {
        type: "Wall top"
        name: "Wall"
        health: 0
        stamina: 0
        maxHealth: 0
        maxStamina: 0
    }

    ListElement {
        type: "Wall bottom"
        name: "Wall"
        health: 0
        stamina: 0
        maxHealth: 0
        maxStamina: 0
    }

    ListElement {
        type: "Wall left"
        name: "Wall"
        health: 0
        stamina: 0
        maxHealth: 0
        maxStamina: 0
    }

    ListElement {
        type: "Wall right"
        name: "Wall"
        health: 0
        stamina: 0
        maxHealth: 0
        maxStamina: 0
    }

    ListElement {
        type: "Enemy"
        name: "Billy"
        health: 0
        stamina: 0
        maxHealth: 0
        maxStamina: 0
    }
}
