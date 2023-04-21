// 实现一个compose方法 可以串联n个函数

function A(config) {
    config.age = 20
    return config
  }
  function B(config) {
    config.city = '上海'
    return config
  }
  function C(config) {
    config.company = '再惠'
    return config
  }
  
  const compose =
    (...args) =>
    (val) => {
      let res = val
      if (args.length === 0) {
        return res
      }
      if (args.length === 1) {
        return args[1](res)
      }
      for (let i in args) {
        if (typeof args[i] === 'function') {
          res = args[i].call(this, res)
        }
      }
  
      return res
    }
  
  const compose2 =
    (...args) =>
    (val) => {
      return args.reduceRight((pre, cur) => cur(pre), val)
    }
  
  console.log(compose(A, B, C)({ name: 'demo' })) // 可能参数有n个方法
  
  const composeFn = compose(A, B, C)
  const composeFn2 = compose2(A, B, C)
  console.log(composeFn({ name: 'demo' }))
  console.log(composeFn2({ name: 'demo' }))
  // // > {name: "demo", age: 20, city: '上海, company: '再惠' }
  