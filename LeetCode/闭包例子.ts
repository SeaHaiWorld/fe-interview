// 闭包
// 简单闭包例子
function outerFunction() {
  var outerVariable = 'I am outer!'

  function innerFunction() {
    console.log(outerVariable)
  }

  return innerFunction
}

var innerFunc = outerFunction()
innerFunc() // 输出 "I am outer!"

// 闭包常见陷阱
// 错误的示例
function createClosureArray() {
  var closures = []
  for (var i = 0; i < 5; i++) {
    closures.push(function () {
      console.log(i)
    })
  }
  return closures
}

var closures = createClosureArray()
closures[0]() // 输出 5，而不是预期的 0
closures[1]() // 输出 5，而不是预期的 1
closures[2]() // 输出 5，而不是预期的 2

// 修正版, 立即执行函数iife
function createClosureArray() {
  var closures = []
  for (var i = 0; i < 5; i++) {
    ;(function (i) {
      closures.push(function () {
        console.log(i)
      })
    })(i)
  }
  return closures
}

// 闭包陷阱
function createCounterObject() {
    var count = 0;

    return {
        count,
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        reset: function() {
            count = 0;
            return count;
        }
    };
}

var counter = createCounterObject();
console.log(counter.count); // 输出 0

console.log(counter.increment()); // 输出 1
console.log(counter.increment()); // 输出 2
console.log(counter.increment()); // 输出 3
console.log(counter.count); // 输出 0

console.log(counter.decrement()); // 输出 2
console.log(counter.count); // 输出 0

console.log(counter.reset()); // 输出 0

// 结合闭包和object getter和setter的例子
function createCounterObject() {
    var count = 0;

    return {
        get count() {
            return count;
        },
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        reset: function() {
            count = 0;
            return count;
        }
    };
}

var counter = createCounterObject();
console.log(counter.count); // 输出 0

console.log(counter.increment()); // 输出 1
console.log(counter.increment()); // 输出 2
console.log(counter.increment()); // 输出 3
console.log(counter.count); // 输出 3

console.log(counter.decrement()); // 输出 2
console.log(counter.count); // 输出 2

console.log(counter.reset()); // 输出 0


