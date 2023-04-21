/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 * @example
 * 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
 */
 var copyRandomList = function(head) {
    // head不存在返回即可
    if (!head) return head
    // 因为链表存在random，如果要复制，走到链表第N个结点时，可能random的结点还没创建
    // 先用一个变量存储链表
    let node = head
    // 使用map结构存储链表的
    let map = new Map()
    while(node) {
        map.set(node, new Node(node.val))
        node = node.next
    }

    // 再用变量存储链表
    node = head

    // 循环链表，从map中读取next和random的值
    while(node) {
        map.get(node).next = map.get(node.next) || null
        map.get(node).random = map.get(node.random)
        node = node.next
    }

    // 从map中取出头结点
    return map.get(head)
};