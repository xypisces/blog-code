
// 懒加载的实质就是将不关键资源延后加载
const lazyFn = () => {
  const target = document.getElementsByTagName('img')

  const viewHeight = window.innerHeight || document.documentElement.clientHeight

  let num = 0
  const lazyload = () => {
    for(let i = num; i<target.length; i++){
      let distant = viewHeight - target[i].getBoundingClientReact().top
      if(distant >= 0) {
        target[i].src = target[i].getAttribute('data-src')
        num = i+1
      }
    }
  }
  window.addEventListener('scroll', lazyload, false)
}