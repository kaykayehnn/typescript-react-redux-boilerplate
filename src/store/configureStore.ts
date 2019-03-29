import { configureStore as configureStoreOriginal } from 'redux-starter-kit/src/configureStore'

import { rootReducer } from './reducers/'
import { AppState } from './state/App.state'

export function configureStore(preloadedState?: AppState) {
  const store = configureStoreOriginal({
    reducer: rootReducer,
    preloadedState,
  })

  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
