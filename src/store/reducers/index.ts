import { combineReducers } from 'redux'

import { counterReducer } from './counter'
import { AppState } from '@Store/state/AppState'

export const rootReducer = combineReducers<AppState>({
  counter: counterReducer
})
