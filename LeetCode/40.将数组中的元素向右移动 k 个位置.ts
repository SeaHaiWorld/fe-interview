function reverseNum(nums, start, end) {
    while (start < end) {
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

function rotateArray(nums, k) {
    const n = nums.length;
    k %= n; // 如果 k 大于数组长度，取余数确保 k 在 0 到 n-1 之间

    reverseNum(nums, 0, n - 1); // 先反转整个数组
    reverseNum(nums, 0, k - 1); // 再反转前 k 个元素
    reverseNum(nums, k, n - 1); // 最后反转剩余的元素

    return nums;
}

// 示例
const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;
console.log("Original array:", nums);
console.log("Rotated array:", rotateArray(nums, k)); // 输出 [5, 6, 7, 1, 2, 3, 4]
