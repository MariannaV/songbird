import './styles/vendors'
import './styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import CONSTANTS from './consts'

if (CONSTANTS.isProd && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed:', registrationError)
      })
  })
}

function App() {
  return <h1>Hello, React World</h1>
}

ReactDOM.render(<App />, document.querySelector('#root'))
