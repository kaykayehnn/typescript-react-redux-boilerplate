import { MapStateToProps as MapStateToPropsOriginal } from 'react-redux'
import AppState from '@Store/state/AppState'

type MapStateToProps<TStateProps, TOwnProps = {}> =
  MapStateToPropsOriginal<TStateProps, TOwnProps, AppState>

export default MapStateToProps
