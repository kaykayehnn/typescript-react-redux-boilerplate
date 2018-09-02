import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { rootReducer } from '../reducers/'

export function configureStore (preloadedState?: any) {
  const store = createStore(rootReducer,
    preloadedState,
    applyMiddleware(thunk, createLogger()))

  if (module.hot) {
    module.hot.accept('../reducers/', () => {
      let { rootReducer } = require('../reducers/')
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
