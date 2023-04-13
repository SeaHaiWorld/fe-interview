/**
 * @param {number} n
 * @return {number}
 */
 var numWays = function(n) {
    const fibArr = [1, 1, 2]
    if (n < 3) {
        return fibArr[n]
    }
    const genFib = (i) => {
        let cur = (fibArr[i - 1] + fibArr[i - 2])%(1e9 + 7)
        if (i === n) {
            return cur
        } else {
            fibArr.push(cur)
            return genFib(i + 1)
        }
    }
    let i = 3
    return genFib(i)
};