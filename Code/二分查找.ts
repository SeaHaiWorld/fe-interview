/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 输入: nums = [-1,0,3,5,9,12], target = 9
 * 输出: 4
 * 解释: 9 出现在 nums 中并且下标为 4
 */
 var search = function(nums, target) {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        if (nums[mid] === target) {
            return mid
        }
        if (nums[mid] > target) {
            right--
        }
        if (nums[mid] < target) {
            left++
        }
    }
    return -1
};