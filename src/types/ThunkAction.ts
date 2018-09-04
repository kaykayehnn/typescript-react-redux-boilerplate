import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { AppState } from '../store/state/AppState'

export type ThunkAction<R> = ThunkAction<R, AppState, undefined, Action<string>>
