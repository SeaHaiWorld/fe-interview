/**
 * @param {string[]} folder
 * @return {string[]}
 */
var removeSubfolders = function(folder) {
    // 排序
    folder.sort();
    const ans = [folder[0]];
    for (let i = 1; i < folder.length; i++) {
        const pre = ans[ans.length - 1]
        const preLen = ans[ans.length - 1].length;
        console.log(ans[ans.length - 1])
        if (!(preLen < folder[i].length 
            && pre === (folder[i].substring(0, preLen)) 
            && folder[i].charAt(preLen) === '/')
        ) {
            ans.push(folder[i]);
        }
    }
    return ans;
};