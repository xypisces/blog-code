function render(tpl,data){
  return tpl.replace(/\{\{(.+?)\}\}/g,(m,m1)=>{
    console.log(m,m1)
    return data[m1]
  })
}

console.log(render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
  name:'姓名',
  age:18
  }))