/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * 
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
给定 target = 5，返回 true。

给定 target = 20，返回 false。
 */
var findNumberIn2DArray = function(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) {
        return false
    }

    let i = 0
    while(i < matrix.length) {
        let left = 0
        let right = matrix[i].length - 1
        let mid
        while(left <= right) {
            mid = Math.floor((left+right)/2)
            let midVal = matrix[i][mid]
            if(target === midVal) return true
            if(target < midVal) right--
            if(target > midVal) left++
        }
        i++
    }
    return false
};

// 只用一次循环实现
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
 var findNumberIn2DArray = function(matrix, target) {
    if (matrix.length === 0 || matrix[0].length === 0) {
        return false
    }

    let left = matrix[0].length - 1, right = 0
    while (left >=0 && right < matrix.length) {
        if (matrix[right][left] === target) {
            return true
        }
        if (matrix[right][left] > target) {
            left--
        }
        if (matrix[right][left] < target) {
            right++
        }
    }
    return false
};

// 只用一次循环实现
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0){
        return false
    }

    let rows = matrix.length
    let cols = matrix[0].length
    let row = 0
    let col = cols - 1
    while (row < rows && col >= 0) {
        if (matrix[row][col] === target) {
            return true
        }

        if (matrix[row][col] > target) {
            col --
        } else {
            row++
        }
    }

    return false
};