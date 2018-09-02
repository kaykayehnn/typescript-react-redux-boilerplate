import { combineReducers } from 'redux'

import { counterReducer } from './counter'
import { AppState } from '../state/AppState'

export const rootReducer = combineReducers<AppState>({
  counter: counterReducer
})
