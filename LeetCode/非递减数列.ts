// 给你一个长度为 n 的整数数组 nums ，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。

// 我们是这样定义一个非递减数列的： 对于数组中任意的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
    if (nums.length === 1) {
        return true
    }
    let breakCount = 0
    const getCount = (arr, c) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                if (arr[i - 1] > arr[i + 1]) {
                    arr[i + 1] = arr[i]
                } else {
                    arr[i] = arr[i + 1]
                }
                c++
                if (c > 1) {
                    return c
                }
            }
        }
        return c
    }
    
    return getCount(nums, breakCount) <= 1
};
