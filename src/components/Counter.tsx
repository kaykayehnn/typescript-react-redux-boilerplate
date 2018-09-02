import * as React from 'react'

import { CounterProps } from '../containers/CounterContainer'

export const Counter: React.StatelessComponent<CounterProps> =
  ({ counter, increment, decrement, incrementAsync }) => (
    <React.Fragment>
      <h1>{counter}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={incrementAsync}>Increment Async</button>
    </React.Fragment>
  )
