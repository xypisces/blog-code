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