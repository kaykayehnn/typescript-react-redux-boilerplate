import { Store, Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export interface Store<S, A extends Action> extends Store<S, A> {
  dispatch: ThunkDispatch<S, never, A>
}
