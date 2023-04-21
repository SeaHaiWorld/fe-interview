// 1023. 驼峰式匹配
// 如果我们可以将小写字母插入模式串 pattern 得到待查询项 query，那么待查询项与给定模式串匹配。（我们可以在任何位置插入每个字符，也可以插入 0 个字符。）

// 给定待查询列表 queries，和模式串 pattern，返回由布尔值组成的答案列表 answer。只有在待查项 queries[i] 与模式串 pattern 匹配时， answer[i] 才为 true，否则为 false。

/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
var camelMatch = function (queries, pattern) {
  const getMin = (s) =>
    Array.from(s.matchAll(/[A-Z][a-z]*/g)).map((v) =>
      v[0].replace(/[A-Z]/g, '')
    )
  const patternMinGroup = getMin(pattern)
  const judge = (q) => {
    const maxEqual = q.replace(/[a-z]/g, '') === pattern.replace(/[a-z]/g, '')

    const getMinInclude = (q) => {
      const qMinGroup = getMin(q)
      let i = 0
      let grouplen = 0
      while (i < patternMinGroup.length) {
        let curQMin = qMinGroup[i].split('')
        let curPmin = patternMinGroup[i].split('')
        if (curPmin.length === 0) {
          grouplen += 1
        }
        while (curQMin.length && curPmin.length) {
          if (curQMin.includes(curPmin[0])) {
            curPmin.shift()
          }

          curQMin.shift()

          if (!curPmin.length) {
            grouplen += 1
          }
        }
        i++
      }
      return grouplen === patternMinGroup.length
    }
    return maxEqual && getMinInclude(q)
  }

  return queries.map((q) => judge(q))
}
