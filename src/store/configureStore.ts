import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from './reducers/'
import { AppState } from './state/AppState'
import { Store } from 'types/Store'
import { AppActions } from './actions'

export function configureStore (preloadedState?: AppState) {
  let store: Store<AppState, AppActions>
  if (preloadedState !== undefined) {
    store = createStore(rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(thunk))
    )
  } else {
    store = createStore(rootReducer,
      composeWithDevTools(applyMiddleware(thunk))
    )
  }

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      const { rootReducer } = require('./reducers/')
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
