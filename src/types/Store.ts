import { Store, Action, AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export default interface Store<S, A extends Action = AnyAction> extends Store<S, A> {
  dispatch: ThunkDispatch<S, never, A>
}
