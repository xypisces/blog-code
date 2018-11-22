
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class NewPromise{
  constructor(handle) {
    if(!handle instanceof Function) { //判断是否接受的是函数
      throw new Error('promise must accept a function')
    }
    this._status = PENDING //初始状态
    this._value = undefined //初始值
    this._fulfilledQueues = [] //成功回调函数队列
    this._rejectedQueues = [] //失败回调函数队列
    //执行handle
    try{
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch {
      this._reject(err)
    }
  }
  //执行resolve
  _resolve = (val) => {
    if(this._status !== PENDING) return
    if(val instanceof NewPromise) {
      return val.then(this._resolve, this._reject)
    }
    setTimeout(()=> {
      this._status = FULFILLED
      this._value = value
      this._fulfilledQueues.forEach(cb => cb())
    })
  }
  //reject时执行的函数
  _reject(err) {
    if(this._status !== PENDING) return
    setTimeout(()=> {
      this._status = REJECTED
      this._value = err
      this._rejectedQueues.forEach(cb => cb())
    })
  }
  then(onFulfilled, onRejected) {
    const { _value, _status } = this
    switch(_status) {
      case PENDING:
        this._fulfilledQueues.push(onFulfilled)
        this._rejectedQueues.push(onRejected)
        break
      case FULFILLED:
        onFulfilled(_value)
        break
      case REJECTED:
        onRejected(_value)
        break
    }
    return new NewPromise((onFulfilledNext, onRejectedNext) => {
      let fulfilled = value => {
        try{
          if(!onFulfilled instanceof Function) {
            onFulfilledNext(value)
          } else{
            let res = onFulfilled(value)
            if(res instanceof NewPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onFulfilledNext(res)
            }
          }
        } catch {
          onRejectedNext(err)
        }
      }
      //封装错误函数
      let rejected = error => {
        try {
          if(!onRejected instanceof Function) {
            onRejectedNext(error)
          }else{
            let res = onRejected(error)
            if(res instanceof NewPromise) {
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              onRejectedNext(res)
            }
          }
        } catch {
          onRejectedNext(err)
        }
      }
      switch (_status) {
        case PENDING:
        this._fulfilledQueues.push(onFulfilled)
        this._rejectedQueues.push(onRejected)
        break
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
}