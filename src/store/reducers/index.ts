import { combineReducers } from 'redux'

import AppState from '@Store/state/App.state'

const rootReducer = combineReducers<AppState>({ state: () => null })

export default rootReducer
