// 给你一个整数数组 nums 和两个整数 firstLen 和 secondLen，请你找出并返回两个非重叠 子数组 中元素的最大和，长度分别为 firstLen 和 secondLen 。

// 长度为 firstLen 的子数组可以出现在长为 secondLen 的子数组之前或之后，但二者必须是不重叠的。

// 子数组是数组的一个 连续 部分。

//  

// 示例 1：

// 输入：nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2
// 输出：20
// 解释：子数组的一种选择中，[9] 长度为 1，[6,5] 长度为 2。
// 示例 2：

// 输入：nums = [3,8,1,3,2,1,8,9,0], firstLen = 3, secondLen = 2
// 输出：29
// 解释：子数组的一种选择中，[3,8,1] 长度为 3，[8,9] 长度为 2。
// 示例 3：

// 输入：nums = [2,1,5,6,0,9,5,0,3,8], firstLen = 4, secondLen = 3
// 输出：31
// 解释：子数组的一种选择中，[5,6,0,9] 长度为 4，[0,3,8] 长度为 3。

/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 */
var maxSumTwoNoOverlap = function(nums, firstLen, secondLen) {
    let sum = 0
    for(let i = 0; i + firstLen <= nums.length; i++) {
        let t = 0
        let curMin = 0
        while (t < firstLen) {
            curMin += nums[i + t]
            t++
        }
        let curMax = 0
        const getSum = (arr) => {
            for (let j = 0; j + secondLen <= arr.length; j++) {
                let p = 0
                let max = 0
                while (p < secondLen) {
                    max += arr[j + p]
                    p++
                }
                curMax = Math.max(curMax, max)
            }
        }
        if (i >= secondLen) {
            getSum(nums.slice(0, i - 1))
        }
        if (i + t <= nums.length - secondLen){
            getSum(nums.slice(i + t))
        }
        sum = Math.max(curMax + curMin, sum)
    }
    return sum
};