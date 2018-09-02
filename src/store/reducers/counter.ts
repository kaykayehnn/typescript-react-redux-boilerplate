import { Action } from 'redux'

import { INCREMENT, DECREMENT } from '../actions/counter'
import { CounterState } from '../state/CounterState'

const initial: CounterState = 0

export function counterReducer (state: CounterState = initial, action: Action<string>) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
