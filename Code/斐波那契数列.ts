// /**
//  * @param {number} n
//  * @return {number}
//  * 循环
//  */
// var fib = function(n) {
//     const fibArr = [0, 1]

//     if (n >= 2){
//         let i = 2
//         while (i <= n) {
//             fibArr[i] = (fibArr[i - 1] + fibArr[i - 2]) % (1e9+7)
//             i++
//         }
//     }
//     return fibArr[n]
// };

/**
 * @param {number} n
 * @return {number}
 * 递归
 */
 var fib = function(n) {
    const fibArr = [0, 1]
    if (n < 2) {
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
    let i = 2
    return genFib(i)
};