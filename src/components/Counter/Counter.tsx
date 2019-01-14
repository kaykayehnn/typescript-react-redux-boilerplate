import React, { FunctionComponent } from 'react'

import styles from './counter.scss'
import { CounterProps } from '@Containers/CounterContainer'

const Counter: FunctionComponent<CounterProps> =
  ({ value, increment, decrement, incrementAsync }) => (
    <div className={styles.counter}>
      <h1>{value}</h1>
      <button className={styles.counterButton} onClick={increment}>Increment</button>
      <button className={styles.counterButton} onClick={decrement}>Decrement</button>
      <button className={styles.counterButton} onClick={incrementAsync}>Increment Async</button>
    </div>
  )

export default Counter
