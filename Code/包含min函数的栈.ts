/**
 * initialize your data structure here.
 */
 var MinStack = function() {
    this.stack = []
    this.minStack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
    this.minStack.push(
        this.minStack.length > 0 
            ? Math.min(this.minStack[this.minStack.length - 1], x) : x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.minStack.pop()
    this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 * @example
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.min();   --> 返回 -3.
 * minStack.pop();
 * minStack.top();      --> 返回 0.
 * minStack.min();   --> 返回 -2.
 * input:
 * ["MinStack","push","push","push","min","pop","top","min"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 * output:
 * [null,null,null,null,-3,null,0,-2]
 */
MinStack.prototype.min = function() {
    return this.minStack[this.minStack.length - 1]
};

/**
 * !!要求时间复杂度O(1)
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */