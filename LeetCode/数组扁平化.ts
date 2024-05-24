// function flattenAndSort(arr) {
//     const flatArray = arr.reduce((acc, curr) => {
//         return acc.concat(Array.isArray(curr) ? flattenAndSort(curr) : curr);
//     }, []);

//     const uniqueArray = [...new Set(flatArray)] as number[];

//     uniqueArray.sort((a, b) => a - b);

//     return uniqueArray;
// }

// const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

// const result = flattenAndSort(arr);
// console.log(result);

function flatArray(arr) {
    // 扁平化数组
    const flattened = arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatArray(cur) : cur);
    }, []);

    // 去除重复元素
    const uniqueArray = [...new Set(flattened)];

    // 排序
    const sortedArray = uniqueArray.sort((a, b) => a - b);

    return sortedArray;
}

const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

const result = flatArray(arr);
console.log(result);
