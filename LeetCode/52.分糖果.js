// 分糖果
// 已解答

// Alice 有 n 枚糖，其中第 i 枚糖的类型为 candyType[i] 。Alice 注意到她的体重正在增长，所以前去拜访了一位医生。

// 医生建议 Alice 要少摄入糖分，只吃掉她所有糖的 n / 2 即可（n 是一个偶数）。Alice 非常喜欢这些糖，她想要在遵循医生建议的情况下，尽可能吃到最多不同种类的糖。

// 给你一个长度为 n 的整数数组 candyType ，返回： Alice 在仅吃掉 n / 2 枚糖的情况下，可以吃到糖的 最多 种类数。
/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function(candyType) {
    let sum = candyType.length / 2
    const uniqueCandies = new Set(candyType)
    return Math.min(uniqueCandies.size, sum)
};

// 分糖果 II

// 排排坐，分糖果。

// 我们买了一些糖果 candies，打算把它们分给排好队的 n = num_people 个小朋友。

// 给第一个小朋友 1 颗糖果，第二个小朋友 2 颗，依此类推，直到给最后一个小朋友 n 颗糖果。

// 然后，我们再回到队伍的起点，给第一个小朋友 n + 1 颗糖果，第二个小朋友 n + 2 颗，依此类推，直到给最后一个小朋友 2 * n 颗糖果。

// 重复上述过程（每次都比上一次多给出一颗糖果，当到达队伍终点后再次从队伍起点开始），直到我们分完所有的糖果。注意，就算我们手中的剩下糖果数不够（不比前一次发出的糖果多），这些糖果也会全部发给当前的小朋友。

// 返回一个长度为 num_people、元素之和为 candies 的数组，以表示糖果的最终分发情况（即 ans[i] 表示第 i 个小朋友分到的糖果数）。
/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function(candies, num_people) {
    let res = new Array(num_people).fill(0)
    let prev = 0
    function distribute(prev, remain) {
        if (remain <= 0) {
            return
        }
        for (let i = 0; i < num_people; i++) {
            prev = prev + 1
            res[i] += Math.min(remain, prev)
            remain = Math.max(remain - prev, 0)
            if (i === num_people - 1 && remain > 0) {
                distribute(prev, remain)
            }
        }
    }
    distribute(prev, candies)
    return res
};
