import { increment, decrement, incrementAsync } from '@Store/actions/counter.actions'
import configureStore from '@Store/configureStore'
import counterReducer from '@Store/reducers/counter.reducer'

describe('Counter Reducer', () => {
  it('increment works', () => {
    const initialState = 0
    const expected = 1

    const result = counterReducer(initialState, increment())

    expect(result).toEqual(expected)
  })

  it('decrement works', () => {
    const initialState = 0
    const expected = -1

    const result = counterReducer(initialState, decrement())

    expect(result).toEqual(expected)
  })

  it('incrementAsync works', () => {
    const store = configureStore()
    const callback = jest.fn()

    const unsubscribe = store.subscribe(callback)

    store.dispatch(incrementAsync())

    jest.advanceTimersByTime(999)
    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(1)
    expect(callback).toBeCalled()

    unsubscribe()
  })
})
