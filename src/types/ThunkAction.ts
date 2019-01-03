import { ThunkAction } from 'redux-thunk'

import { AppState } from '@Store/state/AppState'
import { AppActions } from '@Store/actions'

export type ThunkAction<R> = ThunkAction<R, AppState, undefined, AppActions>
