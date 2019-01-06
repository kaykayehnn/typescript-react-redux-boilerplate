import React, { StrictMode, FunctionComponent } from 'react'
import { Provider } from 'react-redux'

import Store from 'types/Store'
import AppState from '@Store/state/AppState'
import CounterContainer from '@Containers/CounterContainer'

export interface AppProps {
  store: Store<AppState>
}

const App: FunctionComponent<AppProps> =
  ({ store }) => (
    <StrictMode>
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    </StrictMode>
  )

export default App
