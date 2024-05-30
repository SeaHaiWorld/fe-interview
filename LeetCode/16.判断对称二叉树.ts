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
 * @return {boolean}
 */
var checkSymmetricTree = function(root) {
    if (!root) return true

    const judgeIsSymmetricNode = (right, left) => {
        if ((!right && left) || (!left && right)) {
            return false
        }

        if (!right && !left) {
            return true
        }

        if (right && left) {
            if (right.val === left.val) {
                return judgeIsSymmetricNode(left.left, right.right) && judgeIsSymmetricNode(left.right, right.left)
            } else {
                return false
            }
        }
    }

    return judgeIsSymmetricNode(root.right, root.left)
};