import { mockStore } from '../helpers'

import { CounterTypes, incrementAsync } from '@Store/actions/counter.actions'

let store = mockStore()

afterEach(() => {
  store.clearActions()
})

describe('Counter Actions', () => {
  it('incrementAsync works', () => {
    const expected = [{
      type: CounterTypes.INCREMENT
    }]

    store.dispatch(incrementAsync())
    jest.advanceTimersByTime(999)
    expect(store.getActions()).toEqual([])

    jest.advanceTimersByTime(1)
    expect(store.getActions()).toEqual(expected)
  })
})
