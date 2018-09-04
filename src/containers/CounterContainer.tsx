import { connect } from 'react-redux'

import { Counter } from '../components/Counter'
import { increment, decrement, incrementAsync } from '../store/actions/counter'
import { MapStateToProps } from '../types/MapStateToProps'
import { MapDispatchToProps } from '../types/MapDispatchToProps'

interface PropsFromState {
  counter: number
}

interface PropsFromDispatch {
  increment: typeof increment,
  decrement: typeof decrement,
  incrementAsync: typeof incrementAsync
}

export type CounterProps = PropsFromState & PropsFromDispatch

const mapStateToProps: MapStateToProps<PropsFromState> =
  (state) => ({ counter: state.counter })

const mapDispatchToProps: MapDispatchToProps<PropsFromDispatch> = {
  increment,
  decrement,
  incrementAsync
}

export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)
