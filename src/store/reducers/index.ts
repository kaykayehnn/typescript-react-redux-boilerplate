import { combineReducers } from 'redux'

import counterReducer from './counter'
import AppState from '@Store/state/AppState'

const rootReducer = combineReducers<AppState>({
  counter: counterReducer
})

export default rootReducer
