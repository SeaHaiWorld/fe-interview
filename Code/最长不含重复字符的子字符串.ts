/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    // if (!s) return 0
    // let max = 1
    // let curIndex = 0
    // let substr = ""
    // while (curIndex < s.length) {
    //     if (substr.includes(s[curIndex])) {
    //         substr = substr.slice(substr.indexOf(s[curIndex]) + 1)
    //     }
    //     substr += s[curIndex]
    //     max = Math.max(substr.length, max)
    //     curIndex+=1
    // }
    // return max

    if (!s) return 0
    let max = 1, left = 0, right = 0
    while (right <= s.length) {
        max = Math.max(max, right - left)
        if (right === s.length) {
            return max
        }
        if (s.slice(left, right).includes(s[right])) {
            left = s.slice(0, right).lastIndexOf(s[right]) + 1
        }
        right ++
    }
    return max

    // 方法一：滑动窗口
    // let set = new Set(), len = s.length

    // let i = 0, j = 0, max = 0

    // while(i < len && j < len) {
    //     set.add(s[j])
    //     if(set.size === j - i + 1) {
    //         j ++
    //         max = Math.max(max, set.size)
    //     } else {
    //         set.delete(s[i])
    //         i ++
    //     }
    // }
    // return max

    // 方法二：动态规划
    // let max = 0
    // let map = new Map()
    // let temp = 0

    // for(let i = 0; i < s.length; i ++) {
    //     let idx = map.get(s[i])
    //     idx = idx === undefined ? -1 : idx
    //     map.set(s[i], i)
    //     temp = temp < (i - idx) ? temp + 1 : (i - idx)
    //     max = Math.max(max, temp)
    // }
    // return max
}