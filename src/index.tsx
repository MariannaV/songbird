import './index.scss'
import CONSTANTS from './consts'

function component() {
  const element = document.createElement('div')
  element.innerHTML = ['Hello', 'webpack'].join(' ')

  return element
}

document.body.appendChild(component())

if (CONSTANTS.isProd && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
