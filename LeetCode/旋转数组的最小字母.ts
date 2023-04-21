/**
 * @param {number[]} numbers
 * @return {number}
输入：numbers = [3,4,5,1,2]
输出：1
 */
 var minArray = function(numbers) {
    let left = 0, right = numbers.length - 1
    while (left < right) {
        let mid = Math.floor((right + left) / 2)
        if (numbers[right] < numbers[mid]) {
            left = mid + 1
        } else if (numbers[right] > numbers[mid]) {
            right = mid
        } else {
            right-- 
        }
    }
    return numbers[left]
};

/**
 * @param {number[]} numbers
 * @return {number}
输入：numbers = [3,1]
输出：1
 */
 var minArray = function(numbers) {
    let idx = 0
    while(idx + 1 < numbers.length) {
        if (numbers[idx] > numbers[idx + 1]) {
            return numbers[idx + 1]
        }
        idx ++ 
    }
    return numbers[0]
};