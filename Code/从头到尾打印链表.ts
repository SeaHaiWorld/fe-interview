/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 * @example
 * 输入：head = [1,3,2]
 * 输出：[2,3,1]
 */
 var reversePrint = function(head) {
    let stack = []
    while(head) {
        stack.push(head.val)
        head = head.next
    }
    return stack.reverse()
};