import QtQuick 2.15

Entity {
    width: window.height * 4 / 3 > window.width ? window.width : window.height * 4 / 3
    height: (window.width / 4 * 3 > window.height ? window.height : window.width / 4 * 3) - window.height * 0.15
    color: '#333333'
    // color: 'transparent'
}
