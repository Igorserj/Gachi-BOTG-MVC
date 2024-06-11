WorkerScript.onMessage = function(message) {

    for (let f = 1; f <= 3; ++f) {
        const item = floorGen(message.seed.map((s)=> s / f), f)
        message.model.append(item)
    }
    message.model.sync()
    WorkerScript.sendMessage({ })
}

function pseudoRandom(arr) {
    return fract(Math.sin(dot(...arr, 12.9898, 78.233)) * 43758.5453123)
}

function pseudoRandom2(arr) {
    return fract(Math.sin(dot(...arr, 61.512, 95.593)) * 8563.973269)
}

function dot(x1, y1, x2, y2) {
    return (x1 * y1 + x2 * y2)
}

function fract(x) {
    return x - Math.floor(x)
}

function floorGen(seed, floor) {

    let blocks = []
    let nodes = []
    let poses = []
    let angle = 0
    let i = 0
    let j = 0
    const decreasedNodes = []
    const rooms = []
    const passes = []
    let neighbours = []

    function convertNodesToEntryNodes() {
        for (let i = 0; i < nodes.length; ++i) {
            nodes = nodes.map((n)=>({ identifier: n.identifier, pos: n.pos, type: "entrynode" }))
        }
    }

    function availableNodesForBuild() {
        const updatedNodes = []
        for (let k = 0; k < nodes.length; ++k) {
            if (nodes[k].type === "node")
                updatedNodes.push(nodes[k])
        }
        return updatedNodes
    }

    function posesUpdate() {
        poses = [];
        [...blocks, ...nodes].forEach((p)=> { if (p.type === "block" || p.type === "entry" || p.type === "exit") poses.push({ block: p.pos }); else poses.push({ node: p.pos })})
    }

    function nodeRemove(identifier) {
        let nodeId = -1
        for (let l = 0; l < nodes.length; ++l) {
            if (nodes[l].identifier === identifier) {
                nodeId = l
                l = nodes.length
            }
        }
        nodes.splice(nodeId, 1)
    }

    function newBlock(name) {
        const seedClone = [...seed]
        const nodesNode = availableNodesForBuild()
        const number = Math.floor((nodesNode.length - 1) * (pseudoRandom([seedClone[0] * blocks.length, seedClone[1] * blocks.length]) + pseudoRandom([seedClone[2] * blocks.length, seedClone[3] * blocks.length]) + pseudoRandom([seedClone[4] * blocks.length, seedClone[5] * blocks.length]) + pseudoRandom([seedClone[6] * blocks.length, seedClone[7] * blocks.length])) / 4)
        const block = { identifier: nodesNode[number].identifier, pos: nodesNode[number].pos, type: name }
        blocks.push(block)
        nodeRemove(nodesNode[number].identifier)
    }

    function newNodes() {
        const block = blocks[blocks.length - 1]
        for (let i = 1; i <= 4; ++i) {
            const pos = [parseInt(block.pos[0] + Math.sin(angle * (Math.PI / 180))), parseInt(block.pos[1] - Math.cos(angle * (Math.PI / 180)))]
            const posList = []
            poses.forEach((p)=> { posList.push(Object.values(p)[0]) })
            let index = -1
            for (let i = 0; i < posList.length; ++i) {
                if (posList[i][0] === pos[0] && posList[i][1] === pos[1]) {
                    index = i
                    i = posList.length
                }
            }
            if (index === -1) {
                const node = { identifier: (blocks.length - 1) * 4 + i, pos: pos, type: "node" }
                nodes.push(node)
            }
            else {
                if (!!poses[index].node) {
                    let nIndex = -1
                    for (let j = 0; j < nodes.length; ++j) {
                        if (nodes[j].pos[0] === pos[0] && nodes[j].pos[1] === pos[1]) {
                            nIndex = j
                        }
                    }
                    const node = nodes[nIndex]
                    nodes.splice(nIndex, 1, { identifier: node.identifier, pos: node.pos, type: "crossnode" })
                }
            }
            angle += 90
        }
        angle = 0
    }

    function roomChooser() {
        const seedClone = [...seed]
        const number = Math.floor(decreasedNodes.length * (pseudoRandom([seedClone[0] * blocks.length, seedClone[1] * blocks.length]) + pseudoRandom([seedClone[2] * blocks.length, seedClone[3] * blocks.length]) + pseudoRandom([seedClone[4] * blocks.length, seedClone[5] * blocks.length]) + pseudoRandom([seedClone[6] * blocks.length, seedClone[7] * blocks.length])) / 4)
        rooms.push({ identifier: decreasedNodes[number].identifier, pos: decreasedNodes[number].pos, type: "room" })
        decreasedNodes.splice(number, 1)
    }

    function findIds(list, pos) {
        const ids = []
        for (let k = 0; k < list.length; ++k) {
            if (list[k].pos[0] === pos[0] && list[k].pos[1] === pos[1]) {
                ids.push(list[k].identifier)
            }
            else if (list[k].pos[0] === pos[2] && list[k].pos[1] === pos[3]) {
                ids.push(list[k].identifier)
            }
        }
        return ids
    }

    nodes.push({ identifier: 0, pos: [10,10], type: "node" })

    for (j = 0; j < 10; ++j) {
        switch (floor) {
        case 3:
            switch (j) {
            case 0:
                newBlock("entry")
                posesUpdate()
                newNodes()
                posesUpdate()
                break
            case 1:
                newBlock("block")
                convertNodesToEntryNodes()
                posesUpdate()
                newNodes()
                break
            default:
                newBlock("block")
                posesUpdate()
                newNodes()
                break
            }
            posesUpdate()
            break
        default:
            switch (j) {
            case 0:
                newBlock("entry")
                posesUpdate()
                newNodes()
                posesUpdate()
                break
            case 1:
                newBlock("block")
                convertNodesToEntryNodes()
                posesUpdate()
                newNodes()
                break
            case 9:
                newBlock("exit")
                break
            default:
                newBlock("block")
                posesUpdate()
                newNodes()
                break
            }
            posesUpdate()
            break
        }
    }

    nodes.map((n)=>{ if (n.type === "node" || n.type === "crossnode") decreasedNodes.push(n)})
    for (i = 0; i < 7; ++i) {
        roomChooser()
    }

    let verticalBlocks = false
    let horizontalBlocks = false
    for (i = 0; i < blocks.length; ++i) {
        if (blocks[i].type === "block") {
            neighbours.push([])
            const k = neighbours.length-1
            neighbours[k].push(blocks[i].pos)
            for (j = 0; j < blocks.length; ++j) {
                verticalBlocks = ((blocks[i].pos[0] >= blocks[j].pos[0] - 1 && blocks[i].pos[0] <= blocks[j].pos[0] + 1) && blocks[i].pos[1] === blocks[j].pos[1])
                horizontalBlocks = ((blocks[i].pos[1] >= blocks[j].pos[1] - 1 && blocks[i].pos[1] <= blocks[j].pos[1] + 1) && blocks[i].pos[0] === blocks[j].pos[0])
                if (i !== j) {
                    if (verticalBlocks) {
                        neighbours[k].push(blocks[j].pos)
                        passes.push({ identifier: blocks[i].identifier, pos: [...blocks[i].pos, ...blocks[j].pos], type: "horizontal pass" })
                    }
                    else if (horizontalBlocks) {
                        neighbours[k].push(blocks[j].pos)
                        passes.push({ identifier: blocks[i].identifier, pos: [...blocks[i].pos, ...blocks[j].pos], type: "vertical pass" })
                    }
                }
            }
        }
        else if (blocks[i].type === "entry" || blocks[i].type === "exit") {
            for (j = 0; j < blocks.length; ++j) {
                verticalBlocks = ((blocks[i].pos[0] >= blocks[j].pos[0] - 1 && blocks[i].pos[0] <= blocks[j].pos[0] + 1) && blocks[i].pos[1] === blocks[j].pos[1])
                horizontalBlocks = ((blocks[i].pos[1] >= blocks[j].pos[1] - 1 && blocks[i].pos[1] <= blocks[j].pos[1] + 1) && blocks[i].pos[0] === blocks[j].pos[0])
                if (i !== j) {
                    if (verticalBlocks) {
                        passes.push({ identifier: blocks[i].identifier, pos: [...blocks[i].pos, ...blocks[j].pos], type: "horizontal pass" })
                    }
                    else if (horizontalBlocks) {
                        passes.push({ identifier: blocks[i].identifier, pos: [...blocks[i].pos, ...blocks[j].pos], type: "vertical pass" })
                    }
                }
            }
        }
    }
    let hLine = false
    let vLine = false
    const corridor = []

    for (i = 0; i < neighbours.length; ++i) {
        for (j = 1; j < neighbours[i].length; ++j) {
            if (neighbours[i][0][0] === neighbours[i][j][0]) {
                hLine = true
            }
            else {
                hLine = false
                j = neighbours[i].length
            }
        }
        for (j = 1; j < neighbours[i].length; ++j) {
            if (neighbours[i][0][1] === neighbours[i][j][1]) {
                vLine = true
            }
            else {
                vLine = false
                j = neighbours[i].length
            }
        }
        if (hLine || vLine) {
            corridor.push(neighbours[i][0])
        }
        hLine = false
        vLine = false
    }
    const connectedCorridors = []

    for (i = 0; i < corridor.length; ++i) {
        connectedCorridors.push([corridor[i]])
        for (j = i+1; j < corridor.length; ++j) {
            if (corridor[i][0] === corridor[j][0] && (corridor[i][1] >= corridor[j][1] - 1 && corridor[i][1] <= corridor[j][1] + 1) ||
                    corridor[i][1] === corridor[j][1] && (corridor[i][0] >= corridor[j][0] - 1 && corridor[i][0] <= corridor[j][0] + 1)) {
                connectedCorridors[i].push(corridor[j])
                corridor.splice(j, 1)
                j = corridor.length
            }
        }
    }

    neighbours = []
    const connectedRooms = []

    for (i = 0; i < rooms.length; ++i) {
        neighbours.push(rooms[i].pos)
    }
    // console.log(neighbours)

    for (i = 0; i < neighbours.length; ++i) {
        connectedRooms.push([neighbours[i]])
        for (j = i+1; j < neighbours.length; ++j) {
            if (neighbours[i][0] === neighbours[j][0] && neighbours[i][1] >= neighbours[j][1] - 1 && neighbours[i][1] <= neighbours[j][1] + 1 ||
                    neighbours[i][1] === neighbours[j][1] && neighbours[i][0] >= neighbours[j][0] - 1 && neighbours[i][0] <= neighbours[j][0] + 1) {
                connectedRooms[i].push(neighbours[j])
                neighbours.splice(j, 1)
                j = neighbours.length
            }
        }
    }

    const merges = []
    const connections = [...connectedCorridors, ...connectedRooms]
    for (i = 0; i < connections.length; ++i) {
        if (connections[i].length > 1) {
            merges.push(connections[i])
        }
    }

    const blocksBlock = []
    const roomsRoom = []
    for (i = 0; i < blocks.length; ++i) {
        if (blocks[i].type !== "entry" && blocks[i].type !== "exit") {
            blocksBlock.push(blocks[i])
        }
    }
    for (i = 0; i < rooms.length; ++i) {
        roomsRoom.push(rooms[i])
    }

    for (i = 0; i < blocksBlock.length; ++i) {
        for (j = 0; j < roomsRoom.length; ++j) {
            verticalBlocks = ((blocksBlock[i].pos[0] >= roomsRoom[j].pos[0] - 1 && blocksBlock[i].pos[0] <= roomsRoom[j].pos[0] + 1) && blocksBlock[i].pos[1] === roomsRoom[j].pos[1])
            horizontalBlocks = ((blocksBlock[i].pos[1] >= roomsRoom[j].pos[1] - 1 && blocksBlock[i].pos[1] <= roomsRoom[j].pos[1] + 1) && blocksBlock[i].pos[0] === roomsRoom[j].pos[0])
            if (verticalBlocks) {
                passes.push({ identifier: blocksBlock[i].identifier, pos: [...blocksBlock[i].pos, ...roomsRoom[j].pos], type: "horizontal pass" })
                passes.push({ identifier: roomsRoom[j].identifier, pos: [...roomsRoom[j].pos, ...blocksBlock[i].pos], type: "horizontal pass" })
            }
            else if (horizontalBlocks) {
                passes.push({ identifier: blocksBlock[i].identifier, pos: [...blocksBlock[i].pos, ...roomsRoom[j].pos], type: "vertical pass" })
                passes.push({ identifier: roomsRoom[j].identifier, pos: [...roomsRoom[j].pos, ...blocksBlock[i].pos], type: "vertical pass" })
            }
        }
    }

    for (i = 0; i < connections.length; ++i) {
        if (connections[i].length > 1) {
            connections[i] = [...connections[i][0], ...connections[i][1]]
        }
    }
    const removalIndices = []
    for (i = 0; i < passes.length; ++i) {
        for (j = 0; j < connections.length; ++j) {
            const rightOrder = passes[i].pos[0] === connections[j][0] && passes[i].pos[1] === connections[j][1] && passes[i].pos[2] === connections[j][2] && passes[i].pos[3] === connections[j][3]
            const invertedOrder = passes[i].pos[0] === connections[j][2] && passes[i].pos[1] === connections[j][3] && passes[i].pos[2] === connections[j][0] && passes[i].pos[3] === connections[j][1]
            if (rightOrder || invertedOrder) {
                removalIndices.push(i)
                // connects.push([...passes[i].pos, ...connections[j]])
            }
        }
    }
    for (i = 0; i < removalIndices.length; ++i) {
        passes.splice(removalIndices[i], 1, [])
    }
    for (i = 0; i < passes.length; ++i) {
        if (passes[i].length === 0) {
            passes.splice(i, 1)
        }
    }

    const connects = []
    const builds = [...blocksBlock, ...roomsRoom]
    let ids = []

    for (i = 0; i < builds.length; ++i) {
        for (j = 0; j < connections.length; ++j) {
            if (builds[i].pos[0] === connections[j][0] && builds[i].pos[1] === connections[j][1]) {
                ids = findIds(builds, connections[j])
                ids.splice(ids.indexOf(builds[i].identifier), 1)
                if (builds[i].pos[0] - connections[j][2] === 1) {
                    connects.push({ identifier: builds[i].identifier, type: "to left" })
                    connects.push({ identifier: ids[0], type: "to right" })
                }
                else if (builds[i].pos[0] - connections[j][2] === -1) {
                    connects.push({ identifier: builds[i].identifier, type: "to right" })
                    connects.push({ identifier: ids[0], type: "to left" })
                }
                else if (builds[i].pos[1] - connections[j][3] === 1) {
                    connects.push({ identifier: builds[i].identifier, type: "to top" })
                    connects.push({ identifier: ids[0], type: "to bottom" })
                }
                else if (builds[i].pos[1] - connections[j][3] === -1) {
                    connects.push({ identifier: builds[i].identifier, type: "to bottom" })
                    connects.push({ identifier: ids[0], type: "to top" })
                }
            }
            else if (builds[i].pos[0] === connections[j][0] && builds[i].pos[1] === connections[j][1]) {
                ids = findIds(builds, connections[j])
                ids.splice(ids.indexOf(builds[i].identifier), 1)
                if (builds[i].pos[0] - connections[j][0] === 1) {
                    connects.push({ identifier: builds[i].identifier, type: "to left" })
                    connects.push({ identifier: ids[0], type: "to right" })
                }
                else if (builds[i].pos[0] - connections[j][0] === -1) {
                    connects.push({ identifier: builds[i].identifier, type: "to right" })
                    connects.push({ identifier: ids[0], type: "to left" })
                }
                else if (builds[i].pos[1] - connections[j][1] === 1) {
                    connects.push({ identifier: builds[i].identifier, type: "to top" })
                    connects.push({ identifier: ids[0], type: "to bottom" })
                }
                else if (builds[i].pos[1] - connections[j][1] === -1) {
                    connects.push({ identifier: builds[i].identifier, type: "to bottom" })
                    connects.push({ identifier: ids[0], type: "to top" })
                }
            }
        }
    }
    console.log(connects.map((c)=>Object.entries(c)))

    // blocks.forEach((b)=>console.log(Object.entries(b)))
    // passes.forEach((p)=>console.log(Object.entries(p)))

    // console.log("nodes")
    // nodes.forEach((n)=>console.log(n.id, n.pos))
    // console.log("poses")
    // poses.forEach((p)=>console.log(Object.keys(p)[0], Object.values(p)[0]))
    // console.log("blocks")
    // blocks.forEach((b)=>console.log(b.id, b.pos))
    // nodes = JSON.parse(JSON.stringify(nodes))
    // blocks = JSON.parse(JSON.stringify(blocks))
    poses = [...rooms, ...blocks, ...passes].map((it)=>( it.pos ))
    return { items: [...rooms, ...blocks, ...passes], poses: poses, connects: connects }
}
