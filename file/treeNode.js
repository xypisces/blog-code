let tree = {
  id: "1",
  label: "first",
  children: [
    {
      id: "2",
      label: "second"
    },
    {
      id: "3",
      label: "third",
      children: [
        {
          id: "4",
          label: "fourth"
        },
        {
          id: "5",
          label: "fifth"
        }
      ]
    }
  ]
};

//请实现⼀一个查询函数，通过输⼊入Tree 的 Root Node 和 Id，返回与其匹配的节点，
function findNodeById(root, id) {
  let obj = null
  if(root.id === id){
   return root
  }else if(root.children){
    root.children.forEach(item => {
      // if(obj !== null){
      //   return;
      // }
      obj = findNodeById(item, id)
    })
  }
  return obj
}

console.log(findNodeById(tree, "4"))