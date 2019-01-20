import CounterState from '@Store/state/Counter.state'
import { CounterActions, CounterTypes } from '@Store/actions/Counter.actions'

const initial: CounterState = 0

export default function counterReducer (state = initial, action: CounterActions) {
  switch (action.type) {
    case CounterTypes.INCREMENT:
      return state + 1
    case CounterTypes.DECREMENT:
      return state - 1
    default:
      return state
  }
}
