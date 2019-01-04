import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './store/configureStore'
import { App, AppProps } from './App'

const store = configureStore()

mountApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const { App } = require('./App')

    mountApp(App)
  })
}

function mountApp (App: FunctionComponent<AppProps>) {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}
