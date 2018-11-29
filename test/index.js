// function plus(num){
//   let add = function(){
//     let _args = []
//     let _add = function(){
//       [].push.apply(_args,[].slice.call(arguments))
//       return _add
//     }
//     _add.toString = function(){
//       return _args.reduce((a,b) => {
//         return a*b
//       })
//     }
//     return _add
//   }
//   return add()(num)
// }

let curry = function(fn) {
  let _args = []
  return function cb(){
    if(arguments.length === 0){
      return fn.apply(this, _args)
    }
    [].push.apply(_args, [].slice.call(arguments))
    return cb
  }
}

let multi = function() {
  let args = Array.prototype.slice.call(arguments)
  let val = args.reduce((a,b) => {
    return a*b
  });
  return val
}

let ass = curry(multi)
console.log(ass(7)(2)())