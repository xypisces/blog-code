//不传第一个参数则默认为window
//改变this执行，让新对象执行该函数 === 给新对象添加一个函数，然后执行完删除他

Function.prototype.call = (context) => {
  //context为执行上下文
  let context = context || window
  //给context创建一个函数， click.call(a,'1','2') => a.fn = click
  context.fn = this
  //获取除了第一个参数的数组
  let args = [...arguments].slice(1)
  //[...args] = '1','2'
  let result = context.fn(...args)
  //删除函数
  delete context.fn
  return result
}

Function.prototype.apply = (context) => {
  let context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.bind = (context) => {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let _this = this
  let args = [...arguments].slice(1)
  return function F() {
    if(this instanceof F){
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}