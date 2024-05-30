/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
    let node = new ListNode(null)
    let root = node
    while (l1 && l2) {
        if (l1.val > l2.val) {
            root.next = new ListNode(l2.val)
            l2 = l2.next
        } else {
            root.next = new ListNode(l1.val)
            l1 = l1.next
        }
        root = root.next
    }
    if(l1) root.next = l1
    if(l2) root.next = l2
    return node.next
};