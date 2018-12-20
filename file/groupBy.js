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