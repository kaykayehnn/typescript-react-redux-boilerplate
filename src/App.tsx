import React, { Suspense, lazy, StrictMode, FunctionComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import './style.scss'
import Layout from '@Components/Layout'
import CounterContainer from '@Containers/CounterContainer'

import { Store } from 'types/Redux'
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
        <BrowserRouter>
          <Layout>
            <Switch>
              <Suspense fallback={null}>
                {/* Home component is always loaded as it is most likely
                  going to be needed at some point during the user's visit. */}
                <Route exact path={'/'} component={CounterContainer} />
                <Route exact path={'/fancy'} component={FancyCounter} />
              </Suspense>
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )

export default App
