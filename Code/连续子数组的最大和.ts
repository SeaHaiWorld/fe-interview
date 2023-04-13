/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
    if (!nums.length) {
        return 0
    }
    let i = 0
    let sum = nums[0]
    let subSum = 0
    while(i < nums.length) {
        subSum = Math.max(subSum + nums[i], nums[i])
        sum = Math.max(subSum, sum)
        i++
    }
    return sum
};