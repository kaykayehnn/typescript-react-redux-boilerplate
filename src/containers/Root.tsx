import React, { StrictMode, StatelessComponent } from 'react'
import { Provider } from 'react-redux'

import { Store } from 'redux'
import { AppState } from '@Store/state/AppState'
import { CounterContainer } from './CounterContainer'

export interface RootProps {
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
