// function foo(){
//   let a = 20;
//   let b = 310;
//   return function bar(){
//     return a + b
//   }
// }
// var bar = foo()
// console.log(bar())

// Array.prototype.multiply = function(){
//   this.forEach(i => {
//     this.push(i*i)
//   })
//   return this
// }

// const a = [1,2,3,4,5]
// a.multiply()
// console.log(a);

// const a = {
//   key1: Symbol(),
//   key2: 10
// }

// console.log(JSON.stringify(a))

function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function deepclone(obj,hash = new WeakMap()){
  if(!isObject(obj)){
    return obj
  }
  // if(hash.has(obj)){
  //   return hash.get(obj)
  // }
  let isArray = Array.isArray(obj)
  let resultType = isArray ? [] : {}
  // hash.set(obj, resultType)
  let result = Object.keys(obj).map(key => {
    return {
      [key]: deepclone(obj[key], hash)
    }
  })
  return Object.assign(resultType, ...result)

}

let obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
  e: [1,2,3]
}
let d = deepclone(obj)
console.log(d)