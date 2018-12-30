import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './store/configureStore/'
import { RootContainer } from './containers/Root'

const store = configureStore()

mountApp(<RootContainer store={store} />)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const { RootContainer } = require('./containers/Root')

    mountApp(<RootContainer store={store} />)
  })
}

function mountApp (element: JSX.Element): void {
  ReactDOM.render(element, document.getElementById('root'))
}
