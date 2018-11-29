function isObject(o){
  return (typeof o === 'object' || typeof o === 'function') && o !== null
}

//常规
function deepClone(obj){
  if(!isObject(obj)){
    throw new Error('不是对象')
  }
  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}
  for(let key in obj){
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  }
  return cloneObj
}

//含有Symbol属性则需要使用Reflect

function deepClone1(obj) {
  if(!isObject(obj)){
    return false
  }
  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [...obj] : {...obj}
  Reflect.ownKeys(cloneObj).forEach(key => {
    cloneObj[key] = isObject(obj[key]) ? deepClone1(obj[key]) : obj[key]
  })
  return cloneObj
}

//如果是循环引用则使用loadsh， loadsh使用栈存储对象，然后进行比较
//使用hash存储
function deepClone2(obj, hash = new WeakMap()) {
  if(!isObject(obj)){
    return obj
  }
  if(hash.has(obj)) return hash.get(obj)

  let isArray = Array.isArray(obj)
  let cloneObj = isArray ? [] : {}

  hash.set(obj, cloneObj)

  let result = Object.keys(obj).map(key => {
    return{
      [key]: deepClone2(obj[key], hash)
    }
  })

  return Object.assign(cloneObj, ...result)
}