// function foo(){
//   let a = 20;
//   let b = 310;
//   return function bar(){
//     return a + b
//   }
// }
// var bar = foo()
// console.log(bar())

Array.prototype.multiply = function(){
  this.forEach(i => {
    this.push(i*i)
  })
  return this
}

const a = [1,2,3,4,5]
a.multiply()
console.log(a);

// const a = {
//   key1: Symbol(),
//   key2: 10
// }

// console.log(JSON.stringify(a))