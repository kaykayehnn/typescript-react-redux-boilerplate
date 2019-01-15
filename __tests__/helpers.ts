import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

import AppState from '@Store/state/AppState'
import AppActions from '@Store/actions'

export type MockedStore = MockStoreEnhanced<{}, ThunkDispatch<AppState, never, AppActions>>

// Create store once at setup and then invoke clearActions after each fixture.
export function mockStore (): MockedStore {
  return configureMockStore([thunk])()
}
