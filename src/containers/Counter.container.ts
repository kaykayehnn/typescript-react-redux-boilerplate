import { connect } from 'react-redux'

import Counter from '@Components/Counter'
import { increment, decrement, incrementAsync } from '@Store/actions/Counter.actions'
import { DisconnectAction, MapStateToProps, MapDispatchToProps } from 'types/Redux'

export interface PropsFromState {
  value: number
}

export interface PropsFromDispatch {
  increment: DisconnectAction<typeof increment>
  decrement: DisconnectAction<typeof decrement>
  incrementAsync: DisconnectAction<typeof incrementAsync>
}

export type CounterProps = PropsFromState & PropsFromDispatch

export const mapStateToProps: MapStateToProps<PropsFromState> =
  (state) => ({ value: state.counter })

export const mapDispatchToProps: MapDispatchToProps<PropsFromDispatch> = {
  increment,
  decrement,
  incrementAsync
}

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default CounterContainer
