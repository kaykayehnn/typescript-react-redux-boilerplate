import React, { StrictMode, FunctionComponent } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Component from '@Components/Component'

import { Store } from 'types/Redux'
import AppActions from '@Store/actions'
import AppState from '@Store/state/App.state'

export interface AppProps {
  store: Store<AppState, AppActions>
}

const App: FunctionComponent<AppProps> =
  ({ store }) => (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path='/' component={Component} />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )

export default App
