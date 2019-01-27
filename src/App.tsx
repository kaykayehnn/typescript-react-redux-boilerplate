import React, { StrictMode, Suspense, FunctionComponent } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './style.scss'
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
          <Switch>
            <Suspense fallback={null}>
              <Component />
            </Suspense>
          </Switch>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )

export default App
