// /**
//  * @param {number[]} prices
//  * @return {number}
//  */
//  var maxProfit = function(prices) {
//     if (!prices.length) return 0
//     const dict = {}
//     let i = 0
//     while (i < prices.length) {
//         if (!dict[i]) {
//             let max = 0
//             for (let j = i + 1; j < prices.length; j++) {
//                 max = prices[j] > prices[i] 
//                     ? Math.max(max, prices[j] - prices[i]) : max
//             }
//             dict[i] = max
//         }
//         i++
//     }
//     return Object.values(dict).sort((a, b) => b - a)[0]
// };

/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    if (!prices.length) return 0
    let minPrice = Infinity
    let minProfit = 0
    let i = 0
    while (i < prices.length) {
        minProfit = Math.max(minProfit, prices[i] - minPrice)
        minPrice = Math.min(minPrice, prices[i])
        i++
    }
    return minProfit
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let max = 0
    let min = Infinity
    for(let i = 1; i < prices.length; i++) {
        min = Math.min(min, prices[i - 1])
        max = Math.max(prices[i] - min, max)
    }
    return max
};

// 买股票II
// 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

// 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

// 返回 你能获得的 最大 利润 。

 

// 示例 1：

// 输入：prices = [7,1,5,3,6,4]
// 输出：7
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
//      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
//      总利润为 4 + 3 = 7 。
// 示例 2：

// 输入：prices = [1,2,3,4,5]
// 输出：4
// 解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
//      总利润为 4 。
// 示例 3：

// 输入：prices = [7,6,4,3,1]
// 输出：0
// 解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0 。
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // 不持有股票
    let dp0 = 0 
    // 持有股票
    let dp1 = -prices[0]
    for (let i = 1; i < prices.length; i++) {
        // price[i]时，仍不持有股票，之前买了现在卖了，之前就没买
        let newDp0 = Math.max(dp1 + prices[i], dp0)
        // price[i]时，仍持有股票，之前没买了现在卖了，之前就买了
        let newDp1 = Math.max(dp0 - prices[i], dp1)
        dp0 = newDp0
        dp1 = newDp1
    }

    // 最后一定没持有股票
    return dp0
};
