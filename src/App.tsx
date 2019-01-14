import React, { Suspense, lazy, StrictMode, FunctionComponent } from 'react'
import { Provider } from 'react-redux'

import Navigation from '@Components/Navigation'
import CounterContainer from '@Containers/CounterContainer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Store from 'types/Store'
import AppActions from '@Store/actions'
import AppState from '@Store/state/AppState'

export interface AppProps {
  store: Store<AppState, AppActions>
}

const FancyCounter = lazy(() => import('@Components/FancyCounter'))

const App: FunctionComponent<AppProps> =
  ({ store }) => (
    <StrictMode>
      <Provider store={store}>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Navigation />
            <Switch>
              {/* Home component is always loaded as it is most likely
                  going to be needed at some point during the user's visit. */}
              <Route exact path={'/'} component={CounterContainer} />
              <Route exact path={'/fancy'} component={FancyCounter} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </Provider>
    </StrictMode>
  )

export default App
