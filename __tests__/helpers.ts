import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { AppState } from '@Store/state/App.state'
import { AppActionTypes } from '@Store/actions'

type DispatchExts = ThunkDispatch<AppState, never, AppActionTypes>

export type MockedStore = MockStoreEnhanced<{}, DispatchExts>

// Create store once at setup and then invoke clearActions after each fixture.
export function mockStore(preloadedState?: any): MockedStore {
  return configureMockStore([thunk])(preloadedState)
}
