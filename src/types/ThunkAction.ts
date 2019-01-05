import { ThunkAction as ThunkActionOriginal } from 'redux-thunk'

import AppState from '@Store/state/AppState'
import AppActions from '@Store/actions'

type ThunkAction<R> = ThunkActionOriginal<R, AppState, undefined, AppActions>

export default ThunkAction
