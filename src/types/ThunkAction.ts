import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { AppState } from '../store/state/AppState'

// Action
export type ThunkAction<R, A extends Action<string> =
  Action<string>> = ThunkAction<R, AppState, undefined, A>
