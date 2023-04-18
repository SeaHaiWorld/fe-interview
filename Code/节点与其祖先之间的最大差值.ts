/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function(root) {
    const dfs = (node, { min, max }) => {
        if (!node) {
            return 0
        }
        const { val } = node
        const diff = Math.max(Math.abs(val - min), Math.abs(val - max))
        const newMin = Math.min(val, min)
        const newMax = Math.max(val, max)
        return Math.max(
            diff, 
            dfs(node.left, { min: newMin, max: newMax }), 
            dfs(node.right, { min: newMin, max: newMax })
        )
    }
    return dfs(root, { min: root.val, max: root.val })
};
