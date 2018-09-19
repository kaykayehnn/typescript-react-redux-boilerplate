import React, { StatelessComponent } from 'react'

import * as styles from './styles.css'
import { CounterProps } from '../../containers/CounterContainer'

export const Counter: StatelessComponent<CounterProps> =
  ({ counter, increment, decrement, incrementAsync }) => (
    <div className={styles.counter}>
      <h1>{counter}</h1>
      <button className={styles.counterButton} onClick={increment}>Increment</button>
      <button className={styles.counterButton} onClick={decrement}>Decrement</button>
      <button className={styles.counterButton} onClick={incrementAsync}>Increment Async</button>
    </div>
  )
