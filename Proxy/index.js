// es5 defineProperty

Object.defineProperty(obj,prop,descriptor)

var obj = {}
Object.defineProperty(obj, "num", {
  value: 1, //有value代表时数据描述符
  writable: true, //属性值是否可以修改
  enumerable: true, //是否可以枚举
  configurable: true, //属性描述符是否可以被修改（共有数据描述符和存取描述符）
  get: function(){
    return value;  //有get和set方法则为存取描述符
  },
  set: function(newValue) {
    value = newValue
  }
})

//监听

//传统写法
document.getElementById('button').addEventListener('click',()=>{
  let container = document.getElementById('container')
  container.innerHTML = Number(container.innerHTML) + 1
})

//defineProperty
var obj = {
  value: 1,
}

var value = 1

Object.defineProperty(obj,"value",{
  get: function(){
    return value
  },
  set: function(newValue){
    value = newValue
    document.getElementById('container').innerHTML = newValue
  }
})
// ===
watch(obj, "value", function(newvalue){
  document.getElementById('container').innerHTML = newvalue;
})

document.getElementById('button').addEventListener('click',()=>{
  obj.value += 1
})

//watch
(function(){
  function watch(obj, name, func) {
    var value = obj[name];
    Object.defineProperty(obj,name, {
      get: function(){
        return value
      },
      set: function(newValue) {
        value = newValue
        func(value)
      }
    })
    if(value) obj[name] = value
    //proxy
    let proxy = new Proxy(target, {
      get: function(target, prop) {
        return target[prop]
      },
      set: function(target, prop, value) {
        target[prop] = value
        func(prop,value)
      }
    })
    return proxy
  }
  window.watch = watch
})()


//proxy

