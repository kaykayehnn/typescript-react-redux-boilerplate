import { connect } from 'react-redux'

import Counter from '@Components/Counter'
import { increment, decrement, incrementAsync } from '@Store/actions/counter'
import MapStateToProps from 'types/MapStateToProps'
import DisconnectAction from 'types/DisconnectAction'
import MapDispatchToProps from 'types/MapDispatchToProps'

export interface PropsFromState {
  value: number
}

export interface PropsFromDispatch {
  increment: DisconnectAction<typeof increment>
  decrement: DisconnectAction<typeof decrement>
  incrementAsync: DisconnectAction<typeof incrementAsync>
}

export type CounterProps = PropsFromState & PropsFromDispatch

const mapStateToProps: MapStateToProps<PropsFromState> =
  (state) => ({ value: state.counter })

const mapDispatchToProps: MapDispatchToProps<PropsFromDispatch> = {
  increment,
  decrement,
  incrementAsync
}

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default CounterContainer
