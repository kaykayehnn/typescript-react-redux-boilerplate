import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { AppState } from '../store/state/AppState'

export interface ThunkAction<R> extends ThunkAction<R, AppState, undefined, Action<string>> {
}
