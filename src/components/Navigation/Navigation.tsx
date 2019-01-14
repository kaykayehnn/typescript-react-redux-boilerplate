import React, { FunctionComponent } from 'react'
import styles from './navigation.scss'
import { Link } from 'react-router-dom'

const Navigation: FunctionComponent = () => (
  <div>
    <Link className={styles.link} to='/'>Home</Link>
    <Link className={styles.link} to='/fancy'>Fancy Counter</Link>
  </div>
)

export default Navigation
