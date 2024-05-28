class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.handlers = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.value = value
        this.state = 'fulfilled'
        this.handlers.forEach((handler) => handler.onFulfilled(value))
      }
    }

    const reject = (value) => {
      if (this.state === 'pending') {
        this.value = value
        this.state = 'fulfilled'
        this.handlers.forEach((handler) => handler.onRejected(value))
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = (handler) => {
        try {
          const res = handler(this.value)
          if (res instanceof MyPromise) {
            res.then(resolve, reject)
          } else {
            resolve(reject)
          }
        } catch (e) {
          reject(e)
        }
      }

      if (this.state === 'fulfilled') {
        handle(onFulfilled)
      } else if (this.state === 'rejected') {
        handle(onRejected)
      } else {
        this.handlers.push({
          onFulfilled: (value) => handle(onFulfilled),
          onRejected: (reason) => handle(onRejected),
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completedPromises = 0;

      promises.forEach((promise, index) => {
        promise.then(value => {
          results[index] = value;
          completedPromises++;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve).catch(reject);
      });
    });
  }
}