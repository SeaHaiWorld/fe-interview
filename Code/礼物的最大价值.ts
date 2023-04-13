/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxValue = function(grid) {
    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[0].length; i++) {
            if (i > 0 && j > 0) {
                grid[j][i] += 
                    grid[j][i - 1] >= grid[j - 1][i] ? grid[j][i - 1] : grid[j - 1][i]
            } else if (i > 0) {
                grid[j][i] += grid[j][i - 1]
            } else if (j > 0) {
                grid[j][i] += grid[j - 1][i]
            }
        }
    }
    return grid[grid.length - 1][grid[0].length - 1]
};