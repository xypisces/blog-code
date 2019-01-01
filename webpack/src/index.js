import _ from 'lodash';
import './style.css'
import Icon from './logo.png'

function component() {
  const ele = document.createElement('div')

  ele.innerHTML = _.join(['hello','webpack'],' ')
  ele.classList.add('hello')

  const myIcon = new Image()
  myIcon.src = Icon

  ele.appendChild(myIcon)
  
  return ele
}

document.body.appendChild(component())