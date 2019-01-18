import { combineReducers } from 'redux'

import counterReducer from './counter.reducer'
import AppState from '@Store/state/App.state'

const rootReducer = combineReducers<AppState>({
  counter: counterReducer
})

export default rootReducer
