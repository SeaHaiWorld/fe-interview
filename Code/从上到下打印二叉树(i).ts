/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
输入：     3
         / \
        9  20
       /  \
      15   7
输出：[3,9,20,15,7]
 */
 var levelOrder = function(root) {
    if(!root) return []
    let nodes = []
    let queue = [root]
    while (queue.length) {
        const node = queue.shift()
        nodes.push(node.val)
        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {   
            queue.push(node.right)
        }
    }
    return nodes
};