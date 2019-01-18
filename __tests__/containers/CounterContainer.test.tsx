import { mapStateToProps, PropsFromState } from '@Containers/Counter.container'

describe('Counter Container', () => {
  it('mapStateToProps works', () => {
    const counterValue = 0
    const expected: PropsFromState = { value: counterValue }

    const actual = mapStateToProps({ counter: counterValue })

    expect(actual).toEqual(expected)
  })

  // Testing mapDispatchToProps is only useful if it involves any logic.
})
