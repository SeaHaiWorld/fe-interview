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