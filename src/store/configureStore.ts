import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers/'
import AppState from './state/App.state'

export default function configureStore (preloadedState?: AppState) {
  let store = createStore(rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  )

  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
