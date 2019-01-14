import { ActionCreator } from 'redux'

// Keeps parameter signature of function props but sets return value to any,
// that way other components can utilize a not-connected version of that
// subcomponent while maintaining strong typing and preserving semantics.
// The reason we do this is because bound action creators return the action object,
// which is usually not relevant to the component (the exceptions are thunks which
// return promises but even then it is still uncommon).
type DisconnectAction<T extends ActionCreator<any>> = (...args: Parameters<T>) => any

export default DisconnectAction
