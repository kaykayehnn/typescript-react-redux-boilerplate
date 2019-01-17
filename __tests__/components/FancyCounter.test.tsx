import React from 'react'
import { shallow } from 'enzyme'

import FancyCounter from '@Components/FancyCounter'

describe('Fancy Counter', () => {
  it('renders self', () => {
    const wrapper = shallow(<FancyCounter />)
  })
})
