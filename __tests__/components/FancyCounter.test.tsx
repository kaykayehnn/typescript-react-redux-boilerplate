import React from 'react'
import { shallow } from 'enzyme'

import FancyCounter from '@Components/FancyCounter'

test('renders self', function () {
  const wrapper = shallow(<FancyCounter />)
})
