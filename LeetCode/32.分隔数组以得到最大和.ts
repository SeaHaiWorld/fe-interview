// 给你一个整数数组 arr，请你将该数组分隔为长度 最多 为 k 的一些（连续）子数组。分隔完成后，每个子数组的中的所有值都会变为该子数组中的最大值。

// 返回将数组分隔变换后能够得到的元素最大和。本题所用到的测试用例会确保答案是一个 32 位整数。

//  

// 示例 1：

// 输入：arr = [1,15,7,9,2,5,10], k = 3
// 输出：84
// 解释：数组变为 [15,15,15,9,10,10,10]
// 示例 2：

// 输入：arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
// 输出：83
// 示例 3：

// 输入：arr = [1], k = 1
// 输出：1

var maxSumAfterPartitioning = function(arr, k) {
    let len = arr.length
    let i = 1
    let dp = new Array(len + 1).fill(0)
    while (i <= len) {
        let maxVal = arr[i - 1]
        let j = i - 1
        while (j >= Math.max(i - k, 0)) {
            dp[i] = Math.max(dp[i], dp[j] + maxVal * (i - j))
            console.log(i, dp[i])
            maxVal = Math.max(maxVal, arr[j - 1])
            j--
        }
        i++
    }

    return dp[len]
};
