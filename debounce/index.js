// 一句话概括：防抖是连续触发的时间小于wait,则只触发一次,节流则每隔wait时间触发一次

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
