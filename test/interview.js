function foo(){
  let a = 20;
  let b = 310;
  return function bar(){
    return a + b
  }
}
var bar = foo()
console.log(bar())