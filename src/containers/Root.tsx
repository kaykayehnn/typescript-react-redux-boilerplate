import * as React from 'react'
import { Provider } from 'react-redux'
import { Store, AnyAction } from 'redux'

import { CounterContainer } from './CounterContainer'
import { AppState } from '../store/state/AppState'

interface RootProps {
  store: Store<AppState, AnyAction>
}

const Root = ({ store }: RootProps) => (
  <Provider store={store}>
    <CounterContainer />
  </Provider>
)

export const RootContainer = Root
