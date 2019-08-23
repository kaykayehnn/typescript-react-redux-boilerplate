import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'
import { loadPolyfills, registerServiceWorker } from './utilities/app'
import { App } from './App'

loadPolyfills(mountApp)
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App', mountApp)
}

function mountApp() {
  ReactDOM.render(<App />, document.getElementById('root'))
}
