> 四张机，鸳鸯织就欲双飞，可怜未老头先白，春波碧草，晓寒深处，相对浴红衣。


[Promise的实现过程](/Promise/index.js)

[Generator的实现过程](/Generator/index.js)

[防抖和节流](/debounce/index.js)

[call,apply,bind实现](/call-apply-bind/index.js)

[Proxy](/Proxy/index.js)

[虚拟dom实现](/virtual-dom/index.js)

### C++与JS的区别

- C++是静态的，编译型的语言，JS是动态的，解释性的语言，静态语言可以做类型检测，有利于编写高可用的程序，但是过多声明显得冗余
- C++有指针，JS没有
- JS是函数式编程语言，可以把函数当做对象传递，C++实现则需要函数指针
- C++基于类，JS基于原型
- JS可以设置闭包，显式修改上下文（call,apply)

### JS继承的实现过程

- ES5是先新建子类的实例对象this,然后将父类属性添加到子类，所以无法获取父类的内部属性
- ES6是先建立父类的实例对象this,然后将子类的构造函数修饰this,使得父类所有行为都可以继承

```JS
//ES5
function Super(){}
Super.prototype.getNumber = function(){
  return 1
}
function Sub(){}
Sub.prototype = Object.create(Super.prototype, {
  constructor: {
    value: Sub,
    enumerable: false,
    writable: true,
    configurable: true,
  }
})
// object.create的实质就是构建一个空的构造函数，将其原型指向参数对象，然后返回F的示例，从而实现继承的效果
object.create = function(obj){
  function F(){}  // var B = {}
  F.prototype = obj // Object.setPrototypeOf(B,obj)  // B.__proto__ = obj
  return new F() // return B
}

//原生构造函数的继承用上面的ES5的方式是实现不了，必须用ES6
class MyArray extends Array{
  constructor(...args){
    super(...args)
  }
}
//注意点：当继承Object时，参数args会被忽略
```

扩展：实现一个继承多对象的函数mix

```js
function mix(...mixins){
  class Mix{}
  for(let mixin of mixins){
    copyProperties(Mix.prototype, mixin) //拷贝实例属性
    copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)) // 拷贝原型属性
  }
  return Mix
}
function copyProperties(target, source){
  for(let key of Reflect.ownKeys(source)) { //ownKeys返回对象的所有属性
    if( key !== "constructor" 
    && key !== "prototype"
    && key !== "name") {
      let desc = Reflect.getOwnPropertyDescriptor(source, key)  //getOwnPropertyDescriptor返回对象的描述属性
      Reflect.defineProperty(target, key, desc)
    }
  }
}
class Distri extends mix(Logger,Serializable){....}
```

### 简单的闭包缓存数据的例子

```js
function foo(){
  var a = 20;
  var b = 30;
  return function bar(){
    return a + b
  }
}
var bar = foo()
bar()
```

### url->页面的生成过程

- DNS查询,返回IP地址
- TCP三次握手，应用层将数据传到传输层，TCP指明端口号，下发到网络层的IP协议确定IP地址，下发到数据链路层封装数据帧，最后是物理层面的传输
- 如果有HTTPS则还会进行TLS握手，然后进行真正的传输
- 如果有负载均衡的服务器，则将请求分发到多个服务器，
- 假设服务器响应一个文件，浏览器会先判断状态码，200则进行解析，300则进行重定向，400或500则报错
- 如果是gizp等格式则会解压一下，然后通过文件编码去解析
- HTML文件则会构建DOM树，CSS树，遇到JS文件会先判断async还是defer进行下载，如果什么都没有则会阻塞渲染直到JS执行
- HTML完全加载解析后触发DOMContentLoaded树
- CSS树和DOM树构建完成生成render树
- 最后调用GPU绘制，合成图层，显示到屏幕中

#### DNS

```DNS查询过程： 本地缓存->系统配置的DNS服务器->DNS根服务器->到查找的服务器查询二级域名```

#### TCP

- 三次握手：发送请求报文->服务端同意并返回一个应答->客户端发送确认报文
- 四次挥手：发送释放请求->服务端同意并断开连接->若服务端还没发完数据，继续发送然后返回断开应答->客户端发送确认报文
- 拥塞处理：慢开始->拥塞避免->快速重传->快速恢复


![emm](emm.png)

