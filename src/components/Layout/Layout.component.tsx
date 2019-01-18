import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './layout.style.scss'

const Layout: FunctionComponent = ({ children }) => (
  <>
    <div>
      <Link className={styles.link} to='/'>Home</Link>
      <Link className={styles.link} to='/fancy'>Fancy Counter</Link>
    </div>
    <div>
      {children}
    </div>
  </>
)

export default Layout
