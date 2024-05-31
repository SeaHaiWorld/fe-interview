/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 输入: nums = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 * 解释: 9 出现在 nums 中并且下标为 4
 */

console.log(search([-1,0,3,5,9,12], 12))

function search(arr, target) {
    let left = 0
    let right = arr.length - 1
    while (left <= right) {
        let middle = Math.floor((left + right)/2)

        if (arr[middle] === target) {
            return middle
        }

        if (arr[middle] < target) {
            left = middle + 1
        }

        if (arr[middle] > target) {
            right = middle - 1
        }
    }

    return -1
}