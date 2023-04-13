// 1041. 困于环中的机器人
// 在无限的平面上，机器人最初位于 (0, 0) 处，面朝北方。注意:

// 北方向 是y轴的正方向。
// 南方向 是y轴的负方向。
// 东方向 是x轴的正方向。
// 西方向 是x轴的负方向。
// 机器人可以接受下列三条指令之一：

// "G"：直走 1 个单位
// "L"：左转 90 度
// "R"：右转 90 度
// 机器人按顺序执行指令 instructions，并一直重复它们。

// 只有在平面中存在环使得机器人永远无法离开时，返回 true。否则，返回 false。

var isRobotBounded = function(instructions) {
    const direc = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    let x = 0, y = 0
    let i = 0
    let direcIndex = 0
    while (i < instructions.length) {
        const insturction = instructions[i]
        if (insturction === 'G') {
            x +=  direc[direcIndex][0]
            y +=  direc[direcIndex][1]
        } else if (insturction === 'L') {
            direcIndex += 3
            direcIndex = direcIndex % 4

        } else {
            direcIndex += 1
            direcIndex = direcIndex % 4
        }
        i ++
    }

    return direcIndex !== 0 || (x === 0 && y === 0)
}