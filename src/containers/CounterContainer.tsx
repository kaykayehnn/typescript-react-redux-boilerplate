import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'

import { AppState } from '../store/state/AppState'
import { increment, decrement, incrementAsync } from '../store/actions/counter'
import { Counter } from '../components/Counter'

interface PropsFromState {
  counter: number
}

interface PropsFromDispatch {
  increment: typeof increment,
  decrement: typeof decrement,
  incrementAsync: typeof incrementAsync
}

export type CounterProps = PropsFromState & PropsFromDispatch

const mapStateToProps: MapStateToProps<PropsFromState, {}, AppState> =
  (state) => ({ counter: state.counter })

const mapDispatchToProps: MapDispatchToProps<PropsFromDispatch, AppState> = {
  increment,
  decrement,
  incrementAsync
}

export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)
