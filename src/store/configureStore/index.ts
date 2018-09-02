import { Store } from 'redux'

import { AppState } from '../state/AppState'

let configureStoreExport: any
if (process.env.NODE_ENV === 'production') {
  configureStoreExport = require('./configureStore.prod')
} else {
  configureStoreExport = require('./configureStore.dev')
}

export function configureStore (preloadedState?: AppState): Store<AppState> {
  return configureStoreExport.configureStore(preloadedState)
}
