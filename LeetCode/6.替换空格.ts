/**
 * @param {string} s
 * @return {string}
 * @example
 * 输入：s = "We are happy."
 * 输出："We%20are%20happy."
 */
 var replaceSpace = function(s) {
    return s.replaceAll(new RegExp(/\s/, 'g'), '%20')
};

/**
 * @param {string} s
 * @return {string}
 */
 var replaceSpace = function(s) {
    let sArr = s.split(''), res = [], i = 0
    while (i < sArr.length) {
        if (s[i] !== ' ') {
            res.push(s[i])
        } else {
            res.push('%20')
        }
        i++
    }
    return res.join('')
};