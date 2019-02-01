import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'

import './style.scss'
import configureStore from '@Store/configureStore'
import App, { AppProps } from './App'

const store = configureStore()

mountApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default

    mountApp(App)
  })
}

function mountApp (App: FunctionComponent<AppProps>) {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}
