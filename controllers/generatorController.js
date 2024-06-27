function levelBuild(items, walls) {
    let item
    let i = 0
    for (i = 0; i < items.length; ++i) {
        item = items[i]
        if (item.type === "block" || item.type === "entry" || item.type === "exit") {
            levelModel.append({ 'type': "Corridor",
                                  'name': "",
                                  'health': 0,
                                  'stamina': 0,
                                  'maxHealth': 0,
                                  'maxStamina': 0,
                                  'positionX': (item.pos[0] - 10),
                                  'positionY': (item.pos[1] - 10) })
        }
    }

    levelModel.append({
                          'type': "Hero",
                          'name': "Semen",
                          'health': 100,
                          'stamina': 100,
                          'maxHealth': 100,
                          'maxStamina': 100,
                          'positionX': 0,
                          'positionY': 0
                      })

    for (i = 0; i < walls.length; ++i) {
        item = walls[i]
        // if (item.exists) {
            levelModel.append({
                                  'type': item.type,
                                  'name': 'Wall',
                                  'health': 0,
                                  'stamina': 0,
                                  'maxHealth': 0,
                                  'maxStamina': 0,
                                  'positionX': (item.pos[0] - 10),
                                  'positionY': (item.pos[1] - 10)
                              })
        // }
    }
}
