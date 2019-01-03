import { Action } from 'redux'

import { ThunkAction } from 'types/ThunkAction'

export enum CounterTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}

type IncrementAction = Action<CounterTypes.INCREMENT>
type DecrementAction = Action<CounterTypes.DECREMENT>

export type CounterActions = IncrementAction | DecrementAction

export function increment (): IncrementAction {
  return {
    type: CounterTypes.INCREMENT
  }
}

export function decrement (): DecrementAction {
  return {
    type: CounterTypes.DECREMENT
  }
}

export function incrementAsync (): ThunkAction<void, CounterActions> {
  return (dispatch) => {
    setTimeout(() => dispatch(increment()), 1000)
  }
}
