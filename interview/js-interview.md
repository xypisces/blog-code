
### 解析url的参数

```
// 尽可能全面正确的解析一个任意url的所有参数为Object。
var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';
parseParam(url);
/**
结果：
{
user: 'anonymous',
id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
city: '北京', // 中文
enabled: true, // 未指定值的 key 约定值为 true
}
*/
```

[源码](../test/parseParam.js)


### 实现简单的模版引擎

render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
name:'姓名',
age:18
})

// 结果： 我是姓名，年龄18，性别undefined。

[源码](../test/render.js)

### 数据绑定的最基本实现

// 有一个全局变量 a，有一个全局函数 b，实现一个方法bindData，执行后，a的任何赋值都会触发b的执行。
var a = 1;
function b(){
console.log('a的值发生改变');
}
bindData();
a = 2; // 此时输出 a的值发生改变