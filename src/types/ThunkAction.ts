import { ThunkAction } from 'redux-thunk'

import { AppState } from '../store/state/AppState'
import { AppActions } from 'Actions/'

export type ThunkAction<R> = ThunkAction<R, AppState, undefined, AppActions>
