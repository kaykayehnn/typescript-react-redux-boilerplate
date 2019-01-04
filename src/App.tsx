import React, { StrictMode, StatelessComponent } from 'react'
import { Provider } from 'react-redux'

import { Store } from 'redux'
import { AppState } from '@Store/state/AppState'
import { CounterContainer } from '@Containers/CounterContainer'

export interface AppProps {
  store: Store<AppState>
}

export const App: StatelessComponent<AppProps> =
  ({ store }) => (
    <StrictMode>
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    </StrictMode>
  )
