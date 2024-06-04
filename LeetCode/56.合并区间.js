/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    function isConvert(a, b) {
        return b[0] <= a[1] && a[0] <= b[1] ? [Math.min(a[0], b[0]), Math.max(a[1], b[1])] : false
    }
    // 按起始时间排序
    intervals.sort((a, b) => a[0] - b[0]);

    let res = []
    let curVal = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        if (isConvert(intervals[i], curVal)) {
            curVal = isConvert(intervals[i], curVal)
        } else {
            res.push(curVal)
            curVal = intervals[i]
        }
    }
    res.push(curVal)
    return res
};

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    function isConvert(a, b) {
        return b[0] <= a[1] && a[0] <= b[1] ? [Math.min(a[0], b[0]), Math.max(a[1], b[1])] : false
    }
    // 按起始时间排序
    intervals.sort((a, b) => a[0] - b[0]);

    let res = []
    for (let i = 0; i < intervals.length; i++) {
        let curVal = intervals[i]
        for (let j = i; j < intervals.length; j++) {
            if (isConvert(curVal, intervals[j])) {
                curVal = isConvert(curVal, intervals[j])
            }
        }

        if (!res.find(v => isConvert(v, curVal))) {
            res.push(curVal)
        }
    }
    return res
};