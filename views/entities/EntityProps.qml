import QtQuick 2.15

QtObject {
    property int positionX: 0
    property int positionY: 0
    property string name: ''

    property double health: 10
    property int maxHealth: 10
    property int hpRegen: 0

    property int stamina: 10
    property int maxStamina: 10
    property int staminaRegen: 0

    property double attack: 0
    property int attackSpeed: 0
    property int attackRange: 0

    property int defense: 0
    property int distance: 50
    property string facing: 'east'

    // property ListView effectsList
}
