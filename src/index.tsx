import './styles/vendors'
import './styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { LoadableComponent } from '@loadable/component'
import { getModuleAsync } from './modules/optimizations'
import { Header } from './components/header'
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

//TODO: replace to routes
const PageGame: LoadableComponent<unknown> = getModuleAsync({
  moduleName: 'PageGame',
  moduleImport: () => import(/* webpackChunkName: "PageGame", webpackPrefetch: true */ './pages/page-game'),
})

//TODO: connect to React-router and Redux store
function App() {
  return (
    <>
      <Header />
      <PageGame />
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
