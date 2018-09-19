import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './store/configureStore/'
import { RootContainer } from './containers/Root'

const store = configureStore()

mountApp(<RootContainer store={store}></RootContainer>)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    let newRootContainer = require('./containers/Root').RootContainer

    mountApp(React.createElement(newRootContainer, { store }))
  })
}

function mountApp (element: JSX.Element): void {
  ReactDOM.render(element, document.getElementById('root'))
}
