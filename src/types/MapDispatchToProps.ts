import { MapDispatchToProps as MapDispatchToPropsOriginal } from 'react-redux'

type MapDispatchToProps<TDispatchProps, TOwnProps = {}> =
  MapDispatchToPropsOriginal<TDispatchProps, TOwnProps>

export default MapDispatchToProps
