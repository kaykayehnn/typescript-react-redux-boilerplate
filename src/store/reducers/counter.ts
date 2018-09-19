import { CounterState } from '../state/CounterState'
import { CounterActions, INCREMENT, DECREMENT } from '../actions/counter'

const initial: CounterState = 0

export function counterReducer (state: CounterState = initial, action: CounterActions) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}
