function changeBoundariesVisibility() {
    showBoundaries = !showBoundaries
}

function addHeroHealth() {
    hero.health += 10
}

function actionChoose(index) {
    if (index === 0) changeBoundariesVisibility()
}
