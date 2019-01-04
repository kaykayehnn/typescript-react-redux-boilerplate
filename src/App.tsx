import React, { StatelessComponent } from 'react'
import { hot } from 'react-hot-loader/root'

import { configureStore } from './store/configureStore'
import { RootContainer } from './containers/Root'

const store = configureStore()

export const App: StatelessComponent = () => <RootContainer store={store} />

if (module.hot) {
  // Hardcoded in react-error-overlay
  const ERROR_OVERLAY_ZINDEX = 2147483647 + ''

  module.hot.addStatusHandler(status => {
    if (status !== 'apply') return

    // When we receive a hot update check if error overlay is visible
    const isOverlayVisible = Array.from(document.querySelectorAll('iframe'))
      .some(e => e.style.zIndex === ERROR_OVERLAY_ZINDEX)

    // If is, reload browser to restore possibly corrupted application state.
    if (isOverlayVisible) {
      window.location.reload()
    }
  })
}

export default process.env.NODE_ENV === 'production'
  ? App
  : hot(App, {
    errorBoundary: false,
    errorReporter: () => null
  })
