// slice方法
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 * @example
 * 输入: s = "lrloseumgh", k = 6
 * 输出: "umghlrlose"
 */
 var reverseLeftWords = function(s, n) {
    let end = s.slice(n, s.length)
    let head = s.slice(0, n)
    return end + head
};

// 栈
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
 var reverseLeftWords = function(s, n) {
    let res = []
    let i = 0
    while (i + n <= s.length) {
        if (i + n < s.length) {
            res += s[i+n]
        }
        if (i + n  === s.length) {
            let j = 0
            while (j < n) {
                res += s[j]
                j++
            }
        }
        i++
    }
    return res
};