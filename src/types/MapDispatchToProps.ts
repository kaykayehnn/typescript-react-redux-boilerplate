import { MapDispatchToProps as MapDispatchToPropsOriginal } from 'react-redux'
import ThunkAction from './ThunkAction'

// If matches signature (...args) => Thunk => R, returns a function with
// following signature: (...args) => R. Else is identity.
// Parameter names are lost after this operation but it's the best I came up with.
export type Dispatchify<T> =
  (T extends (...args: any[]) => ThunkAction<infer U> ? (...args: Parameters<T>) => U : T)

export type DispatchifyKeys<T> = {
  [K in keyof T]: Dispatchify<T[K]>
}

type MapDispatchToProps<TDispatchProps, TOwnProps = {}> =
  MapDispatchToPropsOriginal<DispatchifyKeys<TDispatchProps>, TOwnProps>

export default MapDispatchToProps
