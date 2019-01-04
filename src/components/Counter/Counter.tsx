import React, { FunctionComponent } from 'react'

import styles from './counter.scss'
import { CounterProps } from '@Containers/CounterContainer'

export const Counter: FunctionComponent<CounterProps> =
  ({ counter, increment, decrement, incrementAsync }) => (
    <div className={styles.counter}>
      <h1>{counter}</h1>
      <button className={styles.counterButton} onClick={increment}>Increment</button>
      <button className={styles.counterButton} onClick={decrement}>Decrement</button>
      <button className={styles.counterButton} onClick={incrementAsync}>Increment Async</button>
    </div>
  )
