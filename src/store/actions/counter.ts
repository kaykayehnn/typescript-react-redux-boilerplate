import { Action } from 'redux'

import { ThunkAction } from 'types/ThunkAction'

export enum CounterTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}

export interface IncrementAction extends Action<CounterTypes.INCREMENT> {
}

export interface DecrementAction extends Action<CounterTypes.DECREMENT> {
}

export type CounterActions =
  | IncrementAction
  | DecrementAction

export function increment (): IncrementAction {
  return { type: CounterTypes.INCREMENT }
}

export function decrement (): DecrementAction {
  return { type: CounterTypes.DECREMENT }
}

export function incrementAsync (): ThunkAction<void> {
  return (dispatch) => {
    setTimeout(() => dispatch(increment()), 1000)
  }
}
