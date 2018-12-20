```js
// 实现一个groupBy函数，将学生按照成绩等级进行分组

function getGrade(score){
  return score < 60 ? 'C' :
   score < 80 ? 'B' : 'A';
  };
  // 学⽣及其成绩
let students = [
  {name: '张三', score: 84},
  {name: '李四', score: 58},
  {name: '王五', score: 99},
  {name: '赵六', score: 69}
];

function groupBy(students=[]) {
  let obj = {}
  for(let i=0; i<students.length; i++){
    let keys = getGrade(students[i].score)
    if(obj.hasOwnProperty(keys)){
      obj[keys].push(students[i])
    }else{
      obj[keys] = [students[i]]
    }
  }
  return obj;
}

console.log(groupBy(students))
```

```js
// 请设计⼀一个字符串串 parse 函数，可以将输⼊入的字符串串分解为对应的树状结构，

function parse(str="") {
  const arr = str.split('<')
  if(arr.length <= 0){
    return {};
  }
  if(arr.length === 1) {
    return { type: str }
  }
  const strArr = arr.map((item,i)=>{
    if(i+1 === arr.length){
      return { type: item.split('>')[0] }
    }
    return { type: item }
  })
  for(let j=strArr.length-1; j-1>=0; j--){
    strArr[j-1]['typeArgs'] = strArr[j]
  }
  return strArr[0]
}

console.log(parse('Array<Array<string>>'))
```