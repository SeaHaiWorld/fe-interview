/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
输入：A = [3,4,5,1,2], B = [4,1]
     3
    / \
   4   5
  / \
 1   2

    4 
  /
 1
输出：true
 */
 var isSubStructure = function(A, B) {
    if (!B) return false
    const isSame = (a, b) => {
        if (!a && !b) return true
        if (!a && b) return false
        // 子树，不用完全一样
        if (a && !b) return true
        if (a && b) {
            if (a.val === b.val) {
                return isSame(a.left, b.left) && isSame(a.right, b.right)
            } else {
                return false
            }
        }
    }

    let res = false
    const dfs = (node, B) => {
        if (!node) return
        if (isSame(node, B)) {
            res = true
        }
        node.left && dfs(node.left, B)
        node.right && dfs(node.right, B)
    }
    dfs(A, B)
    return res
};