import QtQuick 2.15

ListModel {
    ListElement {
        name: 'Health regeneration'
        mode: 'buff'
        characteristic: 'Health'
        type: 'continuous'
        subtype: 'non trigger'
        duration: 5000
        period: 1000
        activation: 'start'
        points: 10
        identifier: -1
    }

    ListElement {
        name: 'Stamina regeneration'
        mode: 'buff'
        characteristic: 'Stamina'
        type: 'continuous'
        subtype: 'non trigger'
        duration: 5000
        period: 1000
        activation: 'start'
        points: 10
        identifier: -1
    }
}
