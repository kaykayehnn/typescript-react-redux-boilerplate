import { configureStore } from '@Store/configureStore'

import { AppState } from '@Store/state/AppState'

test('works without preloaded state', function () {
  const store = configureStore()

  const initialState = store.getState()

  expect(typeof initialState).toBe('object')
})

test('works with preloaded state', function () {
  const preloadedState: AppState = {
    counter: 0
  }

  const store = configureStore(preloadedState)
  const state = store.getState()

  expect(state).toBe(preloadedState)
})
