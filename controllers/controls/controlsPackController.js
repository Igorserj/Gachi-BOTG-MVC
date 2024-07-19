function componentDetermine(type) {
    if (type === "Button") return button
    else if (type === "Slider") return slider
    else if (type === "Dropdown") return dropdown
    else if (type === "Scaler") return scaler
    else if (type === "Cells") return cells
    else if (type === "Options list") return optionsList
}
