import * as React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import { CounterContainer } from './CounterContainer'
import { AppState } from '../store/state/AppState'

interface RootProps {
  store: Store<AppState>
}

export const RootContainer: React.StatelessComponent<RootProps> =
  ({ store }) => (
    <Provider store={store}>
      <CounterContainer />
    </Provider>
  )
