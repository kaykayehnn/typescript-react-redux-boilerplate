import CounterState from '@Store/state/CounterState'
import { CounterActions, CounterTypes } from '@Store/actions/counter'

const initial: CounterState = 0

export default function counterReducer (state: CounterState = initial, action: CounterActions) {
  switch (action.type) {
    case CounterTypes.INCREMENT:
      return state + 1
    case CounterTypes.DECREMENT:
      return state - 1
    default:
      return state
  }
}
