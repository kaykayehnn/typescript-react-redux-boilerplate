import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'
import configureStore from '@Store/configureStore'
import App from './App'

const store = configureStore()

mountApp()

if (module.hot) {
  module.hot.accept('./App', mountApp)
}

function mountApp () {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}
