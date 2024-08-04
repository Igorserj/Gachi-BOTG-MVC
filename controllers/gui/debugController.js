function changeBoundariesVisibility() {
    showBoundaries = !showBoundaries
}

function activateNoClip() {
    hero.parent.noClip = !hero.parent.noClip
}

function addHeroHealth() {
    hero.hp += 10
}

function decHeroHealth() {
    hero.hp -= 10
}

function actionChoose(index) {
    if (index === 0) changeBoundariesVisibility()
    else if (index === 1) activateNoClip()
    else if (index === 2) addHeroHealth()
    else if (index === 3) decHeroHealth()
}
