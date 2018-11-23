function g(fn) {
  return(function(){
    let object = {
      next: 0,
      stop: function() {}
    }
    return {
      next: function() {
        let ret = fn(object)
        if(ret === undefined) return {
          value: undefined,
          done: true,
        }
        return {
          value: ret,
          done: false,
        }
      }
    }
  })()
}