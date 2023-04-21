/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * @example 
 * i: 5 -> 4 -> 3 -> 2 -> 1 -> NULL  
 * o: NULL -> 1 -> 2 -> 3 -> 4 -> 5
 */
 var reverseList = function(head) {
    let temp
    let prev = null // pre 初始为 null
    while(head) {
        temp = head.next // 暂存下个结点
        head.next = prev // 始终是 head 前一结点
        prev = head // prev -> head
        head = temp // head -> head.next
    }
    return prev
};