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

test('it should render self', function () {
  const wrapper = shallow(<Counter {...props} />)

  expect(wrapper.find('h1').text()).toEqual(props.value.toString())

  expect(wrapper.find('button')).toHaveLength(3)
})

test('increment button works', function () {
  const node = shallow(<Counter {...props} />)

  const button = node.find('button').at(0)

  expect(props.increment).not.toBeCalled()

  button.simulate('click')

  expect(props.increment).toBeCalled()
})
