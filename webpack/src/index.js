import _ from 'lodash';
import './style.css'
import Icon from './logo.png'
import printMe from './print'
import anthor from './anthor'

function component() {
  const ele = document.createElement('div')

  ele.innerHTML = _.join(['hello','webpack'],' ')
  ele.classList.add('hello')

  const myIcon = new Image()
  myIcon.src = Icon

  const btn = createBtn()

  ele.appendChild(myIcon)
  ele.appendChild(btn)

  return ele
}

function createBtn() {
  const btn = document.createElement('button')
  btn.innerHTML = 'click me'
  btn.onclick = printMe
  return btn
}

document.body.appendChild(component())