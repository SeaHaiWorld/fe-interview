/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 递归
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function(head) {
    if (!head) return null

    head.next = removeNodes(head.next)

    if (head.next && head.next.val > head.val) {
        return head.next
    }

    return head
};

// 栈
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function(head) {
    let stack = []
    while(head) {    
        stack.push(head)
        head = head.next
    }

    while(stack.length) {
        let node = stack.pop()
        if (head === null || node.val >= head.val) {
            node.next = head
            head = node
        }
    }

    return head
};

// 反转链表
var reverse = function(head) {
    let dummy = new ListNode()
    while (head !== null) {
        let p = head
        head = head.next
        p.next = dummy.next
        dummy.next = p
    }
    return dummy.next
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function(head) {
    head = reverse(head)
    let cur = head
    while(cur && cur.next) {
        if (cur.val > cur.next.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return reverse(head)
};