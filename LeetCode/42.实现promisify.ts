// 实现Promisify，使callback等函数可以以异步形式调用

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

const sum = (a, b, callback) => {
  setTimeout(() => {
    callback(null, a + b)
  }, 0)
}

const promisifiedSum = promisify(sum)

sum(1, 2, (err, result) => {
  console.log({ err, result })
})

promisifiedSum(1, 2).then((result) => {
  console.log('result', result)
})
