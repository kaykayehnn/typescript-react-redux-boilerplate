import { Action } from 'redux'

import { ThunkAction } from '../../types/ThunkAction'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export function increment (): Action<string> {
  return { type: INCREMENT }
}

export function decrement (): Action<string> {
  return { type: DECREMENT }
}

export function incrementAsync (): ThunkAction<void> {
  return (dispatch) => {
    setTimeout(() => dispatch(increment()), 1000)
  }
}
