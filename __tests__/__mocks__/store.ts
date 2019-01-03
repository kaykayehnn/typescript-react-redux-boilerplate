import configureMockStore, { MockStoreCreator } from 'redux-mock-store'

import thunk, { ThunkDispatch } from 'redux-thunk'
import { AppState } from '@Store/state/AppState'
import { AppActions } from '@Store/actions'

export type CreateMockedStore = MockStoreCreator<{}, ThunkDispatch<AppState, never, AppActions>>

export function createMockStore (): CreateMockedStore {
  return configureMockStore([thunk])
}
