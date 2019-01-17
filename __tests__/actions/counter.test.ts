import { mockStore } from '../helpers'

import {
  increment,
  CounterTypes,
  IncrementAction,
  DecrementAction,
  decrement,
  incrementAsync
} from '@Store/actions/counter'

let store = mockStore()

afterEach(function () {
  store.clearActions()
})

test('incrementAsync works', function () {
  const expected = [{
    type: CounterTypes.INCREMENT
  }]

  const store = mockStore()
  store.dispatch(incrementAsync())

  jest.advanceTimersByTime(999)
  expect(store.getActions()).toEqual([])

  jest.advanceTimersByTime(1)
  const actual = store.getActions()

  expect(actual).toEqual(expected)
})
