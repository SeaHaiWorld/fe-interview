/**
 * @param {number} num
 * @return {number}
 */
 var translateNum = function(num) {
    if (num < 10) return 1

    let str = num + ''
    let dp = [1, 1]
    for (let i = 1; i < str.length; i++) {
        let n = +str.slice(i - 1, i + 1)
        if (n >= 10 && n <= 25) {
            dp[i + 1] = dp[i - 1] + dp[i]
        } else {
            dp[i + 1] = dp[i]
        }
    }
    return dp[str.length]
};
