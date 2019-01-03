import { createMockStore } from '../__mocks__/store'
import { increment, CounterTypes, IncrementAction, DecrementAction, decrement, incrementAsync } from '@Store/actions/counter'

const mockStore = createMockStore()

test('increment works', function () {
  const expected: IncrementAction = {
    type: CounterTypes.INCREMENT
  }

  const actual = increment()

  expect(actual).toEqual(expected)
})

test('decrement works', function () {
  const expected: DecrementAction = {
    type: CounterTypes.DECREMENT
  }

  const actual = decrement()

  expect(actual).toEqual(expected)
})

test('incrementAsync works', function () {
  const expected: [IncrementAction] = [{
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
