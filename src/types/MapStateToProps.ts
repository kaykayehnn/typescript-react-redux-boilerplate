import { MapStateToProps } from 'react-redux'
import { AppState } from '../store/state/AppState'

export type MapStateToProps<TStateProps, TOwnProps = {}> =
  MapStateToProps<TStateProps, TOwnProps, AppState>
