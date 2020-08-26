import './styles/vendors'
import './styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { routes } from './consts/routes'
import { Header } from './components/header' //TODO: fix as absolute url
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
  const Routes = React.useMemo(
    () =>
      routes.map((route) => (
        <Route
          path={route.props.pathname}
          component={route.props.Component}
          exact={route.props.exact}
          key={route.props.pathname}
        />
      )),
    []
  )

  return (
    <Router>
      <Header />
      <Switch children={Routes} />
    </Router>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
