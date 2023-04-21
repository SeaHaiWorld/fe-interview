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
  [9,20],
  [15,7]
]
 */
 var levelOrder = function(root) {
    if (!root) {
        return []
    }
    let nowLevel = [root]
    let nodes = []
    while(nowLevel.length) {
        let nextLevel = []
        let curnodes = []
        for (let node of nowLevel) {
            curnodes.push(node.val)
            if (node.left) {
                nextLevel.push(node.left)
            }
            if (node.right) {
                nextLevel.push(node.right)
            }
        }
        nowLevel = nextLevel
        nodes.push(curnodes)
    }
    return nodes
};