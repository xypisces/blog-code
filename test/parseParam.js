function parseParam(url){
  let param = {}
  let arr = url.split("?")
  if(arr.length <=1 ) {
    return param
  }
  arr = arr[1].split("&")
  for(let i=0; i<arr.length; i++){
    let obj = arr[i].split("=")
    if(param.hasOwnProperty(obj[0])){
      if(Array.isArray(param[obj[0]])){
        param[obj[0]].push(obj[1])
      }else{
        param[obj[0]] = [param[obj[0]], obj[1]]
      }
    }else if(!obj[1]){
      param[obj[0]] = true
    }else{
      param[obj[0]] = decodeURI(obj[1])
    }
    // decodeURI
  }
  return param
}

var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(parseParam(url));