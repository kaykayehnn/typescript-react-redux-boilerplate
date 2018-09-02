import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './style.css'
import { configureStore } from './store/configureStore/'
import { RootContainer } from './containers/Root'

const store = configureStore()

render(<RootContainer store={store}></RootContainer>)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    let newRootContainer = require('./containers/Root').RootContainer
    render(React.createElement(newRootContainer, { store }))
  })
}

function render (element: JSX.Element): void {
  ReactDOM.render(element, document.getElementById('root'))
}
