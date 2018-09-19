import { Action } from 'redux'

import { ThunkAction } from '../../types/ThunkAction'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export interface IncrementAction extends Action<typeof INCREMENT> {
}
export interface DecrementAction extends Action<typeof DECREMENT> {
}

export type CounterActions = IncrementAction | DecrementAction

export function increment (): IncrementAction {
  return { type: INCREMENT }
}

export function decrement (): DecrementAction {
  return { type: DECREMENT }
}

export function incrementAsync (): ThunkAction<void> {
  return (dispatch) => {
    setTimeout(() => dispatch(increment()), 1000)
  }
}
