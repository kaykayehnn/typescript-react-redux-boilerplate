import { mapStateToProps, PropsFromState } from '@Containers/CounterContainer'

describe('Counter Container', () => {
  it('mapStateToProps works', () => {
    const counterValue = 0
    const expected: PropsFromState = { value: counterValue }

    const actual = mapStateToProps({ counter: counterValue })

    expect(actual).toEqual(expected)
  })

  // Testing mapDispatchToProps is only useful if it involves any logic.
})
