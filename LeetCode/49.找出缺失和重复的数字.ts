// 输入：grid = [[1,3],[2,2]]
// 输出：[2,4]
// 解释：数字 2 重复，数字 4 缺失，所以答案是 [2,4] 。
var findMissingAndRepeatedValues = function(grid) {
    const n = grid.length;
    const numbersSet = new Set();
    let repeatValue = -1;

    for (let i = 0; i < n; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            const num = row[j];
            if (!numbersSet.has(num)) {
                numbersSet.add(num);
            } else {
                repeatValue = num;
            }
        }
    }

    let missingValue = -1;
    for (let i = 1; i <= n * n; i++) {
        if (!numbersSet.has(i)) {
            missingValue = i;
            break;
        }
    }

    return [repeatValue, missingValue];
};
