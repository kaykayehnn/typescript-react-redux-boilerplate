import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'
import { loadPolyfills, registerServiceWorker } from './utilities/app'
import { configureStore } from './store/configureStore'
import { App } from './App'

const store = configureStore()

loadPolyfills(mountApp)
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App', mountApp)
}

function mountApp() {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}
