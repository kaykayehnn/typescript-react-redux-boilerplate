import { combineReducers } from 'redux'

import { AppState } from '@Store/state/App.state'

export const rootReducer = combineReducers<AppState>({ state: () => null })
