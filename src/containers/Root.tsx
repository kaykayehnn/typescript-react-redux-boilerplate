import React, { StrictMode, StatelessComponent } from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import { CounterContainer } from './CounterContainer'
import { AppState } from '@Store/state/AppState'

interface RootProps {
  store: Store<AppState>
}

export const RootContainer: StatelessComponent<RootProps> =
  ({ store }) => (
    <StrictMode>
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    </StrictMode>
  )
