import React from 'react'
import { shallow } from 'enzyme'

import Counter from '@Components/Counter'
import { CounterProps } from '@Containers/CounterContainer'

let props: CounterProps

beforeEach(function () {
  props = {
    value: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
    incrementAsync: jest.fn()
  }
})

test('renders self', function () {
  const wrapper = shallow(<Counter {...props} />)
})

test('increment button works', function () {
  const wrapper = shallow(<Counter {...props} />)

  const button = wrapper.find('button').at(0)

  expect(props.increment).not.toBeCalled()

  button.simulate('click')

  expect(props.increment).toBeCalled()
})
