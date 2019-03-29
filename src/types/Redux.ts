import { Store as StoreOriginal, Action, AnyAction } from 'redux'
import { ThunkDispatch, ThunkAction as ThunkActionOriginal } from 'redux-thunk'
import {
  MapDispatchToProps as MapDispatchToPropsOriginal,
  ResolveThunks,
} from 'react-redux'

import { AppState } from '@Store/state/App.state'
import { AppActionTypes } from '@Store/actions'

export interface Store<S, A extends Action = AnyAction>
  extends StoreOriginal<S, A> {
  dispatch: ThunkDispatch<S, never, A>
}

export type MapStateToProps<TStateProps, TOwnProps = {}> = (
  state: AppState,
  ownProps?: TOwnProps
) => TStateProps

export type MapDispatchToProps<
  TDispatchProps,
  TOwnProps = {}
> = MapDispatchToPropsOriginal<TDispatchProps, TOwnProps>

export type MergeProps<TStateProps, TDispatchProps = {}> = TStateProps &
  ResolveThunks<TDispatchProps>

export type ThunkAction<R> = ThunkActionOriginal<
  R,
  AppState,
  undefined,
  AppActionTypes
>
