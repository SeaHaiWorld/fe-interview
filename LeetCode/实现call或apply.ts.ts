// 手写实现 call 方法
interface Function {
  myCall(context: any, ...args: any[]): any
  myApply(context: any, argsArr: any[]): any
}

Function.prototype.myCall = function (context: any, ...args: any[]): any {
    context = context || window
    let uniqueKey = Symbol()

    context[uniqueKey] = this;

    const result = context[uniqueKey](...args);

    // 删除临时方法
    delete context[uniqueKey];

    return result;
}

Function.prototype.myApply = function (context: any, ...argsArr: any[]): any {
    context = context || window
    let uniqueKey = Symbol()

    context[uniqueKey] = this;

    const result = context[uniqueKey](...argsArr);

    // 删除临时方法
    delete context[uniqueKey];

    return result;
}

