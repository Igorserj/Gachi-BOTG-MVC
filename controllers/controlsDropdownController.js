function dropdown() {
    if (dropdownItem.state === 'collapsed') {
        dropdownItem.state = 'expanded'
        footerRep.model = options
    }
    else if (dropdownItem.state === 'expanded') {
        dropdownItem.state = 'collapsed'
        footerRep.model = []
    }
}
