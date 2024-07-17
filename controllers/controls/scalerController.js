function colorFilling() {
    if (units === "HP") return "lightgreen"
    else if (units === "SP") return "cyan"
    else return "transparent"
}

function calcValue() {
    if (value <= maxValue) return {value: value / maxValue, surplus: 0}
    else return {value: 1, surplus: 1}
}
