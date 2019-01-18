import React from 'react'
import { shallow } from 'enzyme'

import Counter from '@Components/Counter'
import { CounterProps } from '@Containers/Counter.container'

let props: CounterProps

beforeEach(() => {
  props = {
    value: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
    incrementAsync: jest.fn()
  }
})

describe('Counter Component', () => {
  it('renders self', () => {
    const wrapper = shallow(<Counter {...props} />)
  })

  it('increment button works', () => {
    const wrapper = shallow(<Counter {...props} />)

    const button = wrapper.find('button').at(0)

    expect(props.increment).not.toBeCalled()

    button.simulate('click')

    expect(props.increment).toBeCalled()
  })
})
