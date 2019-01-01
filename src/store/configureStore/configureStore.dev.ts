import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { rootReducer } from '../reducers/'
import { AppState } from '../state/AppState'
import { AppActions } from 'Actions/'

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

  if (module.hot) {
    module.hot.accept('../reducers/', () => {
      const { rootReducer } = require('../reducers/')
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
