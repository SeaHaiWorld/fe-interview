/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var getKthFromEnd = function(head, k) {
    let len = 0
    let node = head
    while (node) {
        len++
        node = node.next
    }

    let newHead = null
    let i = 0
    while(head) {
        if (len - k === i) {
            newHead = head
        }
        head = head.next
        i++
    }
    return newHead
};

var getKthFromEnd = function(head, k) {
    let fast = head, slow = head
    while(k > 0) {
        fast = fast.next
        k--
    }
    while(fast) {
        fast = fast.next
        slow = slow.next
    }
    return slow
};