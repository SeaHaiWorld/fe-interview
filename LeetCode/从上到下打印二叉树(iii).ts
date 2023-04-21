/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
输入
    3
   / \
  9  20
    /  \
   15   7
输出
[
  [3],
  [20,9],
  [15,7]
]
 */
 var levelOrder = function(root) {
    if (!root) return []
    let nowLevel = [root]
    let level = 0
    let nodes = []
    while (nowLevel.length) {
        let sortLevel = nowLevel
        let nextLevel = []
        let curnodes = []
        for (let node of sortLevel) {
            curnodes.push(node.val)
            if (node.left) {
                nextLevel.push(node.left)
            }
            if (node.right) {
                nextLevel.push(node.right)
            }
        }
        nowLevel = nextLevel
        nodes.push(level % 2 === 0 ? curnodes : curnodes.reverse())
        level ++ 
    }
    return nodes
};