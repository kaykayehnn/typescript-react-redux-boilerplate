import { ActionCreator } from 'redux'

type DisconnectAction<T extends ActionCreator<any>> = (...args: Parameters<T>) => any

export default DisconnectAction
