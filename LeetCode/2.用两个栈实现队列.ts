var CQueue = function() {
    this.stack1 = []
    this.stack2 = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stack1.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if (this.stack2.length) {
        return this.stack2.pop()
    }
    while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
    }
    if (this.stack2.length) {
        return this.stack2.pop()
    }
    return -1
};

/**
 * Your CQueue object will be instantiated and called as such:
 * ```
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 * ```
 * @example
 * 输入：
 * ["CQueue","appendTail","deleteHead","deleteHead"]
 * [[],[3],[],[]]
 * 输出：
 * [null,null,3,-1]
 */
function test() {

}