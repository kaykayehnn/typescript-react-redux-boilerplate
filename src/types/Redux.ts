import { Store as StoreOriginal, Action, AnyAction, ActionCreator } from 'redux'
import { ThunkDispatch, ThunkAction as ThunkActionOriginal } from 'redux-thunk'
import { MapDispatchToProps as MapDispatchToPropsOriginal } from 'react-redux'

import AppState from '@Store/state/App.state'
import AppActionTypes from '@Store/actions'

export interface Store<S, A extends Action = AnyAction> extends StoreOriginal<S, A> {
  dispatch: ThunkDispatch<S, never, A>
}

export type MapStateToProps<TStateProps, TOwnProps = {}> =
  (state: AppState, ownProps?: TOwnProps) => TStateProps

export type MapDispatchToProps<TDispatchProps, TOwnProps = {}> =
  MapDispatchToPropsOriginal<TDispatchProps, TOwnProps>

// Keeps parameter signature of function props but sets return value to any,
// that way other components can utilize a not-connected version of that
// subcomponent while maintaining strong typing and preserving semantics.
// The reason we do this is because bound action creators return the action object,
// which is usually not relevant to the component (the exceptions are thunks which
// return promises but even then it is still uncommon).
export type DisconnectAction<T extends ActionCreator<any>> = (...args: Parameters<T>) => any

export type ThunkAction<R> = ThunkActionOriginal<R, AppState, undefined, AppActionTypes>
