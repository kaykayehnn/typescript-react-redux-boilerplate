import reactHotLoader from 'react-hot-loader/root'

jest.mock('react-hot-loader/root')

test('doesn\'t export hot when in production environment', function () {
  let previousEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  require('../../src/App')

  expect(reactHotLoader.hot).not.toHaveBeenCalled()

  process.env.NODE_ENV = previousEnv
})
