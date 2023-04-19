// 你会得到一个字符串 text 。你应该把它分成 k 个子字符串 (subtext1, subtext2，…， subtextk) ，要求满足:

// subtexti 是 非空 字符串
// 所有子字符串的连接等于 text ( 即subtext1 + subtext2 + ... + subtextk == text )
// 对于所有 i 的有效值( 即 1 <= i <= k ) ，subtexti == subtextk - i + 1 均成立
// 返回k可能最大值。

//  

// 示例 1：

// 输入：text = "ghiabcdefhelloadamhelloabcdefghi"
// 输出：7
// 解释：我们可以把字符串拆分成 "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)"。
// 示例 2：

// 输入：text = "merchant"
// 输出：1
// 解释：我们可以把字符串拆分成 "(merchant)"。
// 示例 3：

// 输入：text = "antaprezatepzapreanta"
// 输出：11
// 解释：我们可以把字符串拆分成 "(a)(nt)(a)(pre)(za)(tpe)(za)(pre)(a)(nt)(a)"。

function longestDecomposition(text) {
    if (!text.length) {
        return 0
    }
    if (text.length === 1) {
        return 1;
    }
    for (let i = 1; i <= text.length / 2; i++) {
        if (text.slice(0, i) === text.slice(-i)) {
            return 2 + longestDecomposition(text.slice(i, -i));
        }
    }
    return 1;
}
