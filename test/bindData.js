//defineProperty


//proxy
let bindData = (obj,setBind,getLogger) => {
  let handler = {
    get(target,property,receiver) {
      getLogger(target,property)
      return Reflect.get(target,property,receiver)
    },
    set(target,property, value, receiver) {
      setBind(value)
      return Reflect.get(target,property,value, receiver)
    },
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let value
let p = bindData(obj, (v) => {
  value = v
}, (target, property) => {
  console.log(`Get '${property}' = ${target[property]}`);
})
p.a = 2 // bind `value` to `2`
p.a // -> Get 'a' = 2


