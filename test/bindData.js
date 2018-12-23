//defineProperty 只能给对象属性绑定，需要深度遍历对象
function bindData1(target, event) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      (function() {
        var v = target[key];
        Object.defineProperty(target, key, {
          get: function() {
            return v;
          },
          set: function(_value) {
            v = _value;
            event.call(this);
          }
        });
      })();
    }
  }
}
let obj2 = {
  a: 2
}
bindData1(obj2,()=>{console.log('hhhh')})
obj2.a = 3
//proxy
let bindData = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value);
      return Reflect.get(target, property, value, receiver);
    }
  };
  return new Proxy(obj, handler);
};

let obj = { a: 1 };
let value;
let p = bindData(
  obj,
  v => {
    value = v;
  },
  (target, property) => {
    console.log(`Get '${property}' = ${target[property]}`);
  }
);
p.a = 2; // bind `value` to `2`
p.a; // -> Get 'a' = 2
