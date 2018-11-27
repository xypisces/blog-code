// 一句话概括：防抖是连续触发的时间小于wait,多次执行则只触发一次,节流则多次执行变成每隔一段时间触发一次

//防抖

//初始版
function debounce(func, wait=50) {
  let timer = 0
  return function(...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// 升级版- 需要立刻执行的防抖函数，下次触发需要等待wait时间
function now(){
  return +new Date()
}

const debounce = (func, wait=50, immediate=true) => {
  let timer, context, args
  
  const later = () => setTimeout(()=> {
    timer = null
    if(!immediate) {
      func.apply(context, args)
      context = args = null
    }
  }, wait)

  return function(...params) {
    if(!timer){
      timer = later()
      if(immediate){
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(later)
      timer = later()
    }
  }
}



/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数   
 */
const throttle = (func, wait, options) => {
  let context, args, result;
  let timeout = null
  //之前的时间戳
  let previous = 0
  if(!options) options = {}
  let later = () => {
    previous = options.leading === false ? 0 : now()
    // 防止内存泄漏
    timeout = null
    result = func.apply(context, args)
    if(!timeout) context = args = null
  }
  return function() {
    let now = now()
    if(!previous && options.leading === false) previous = now

    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if(remaining <=0 || remaining > wait) {
      if(timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if(!timeout) context = args = null;
    } else if(!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result;
  }
}