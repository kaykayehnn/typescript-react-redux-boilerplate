export function loadPolyfills(callback: Function) {
  const isModernBrowser = 'fetch' in window

  if (isModernBrowser) {
    callback()
  } else {
    import(/* webpackChunkName: "polyfills" */ '../polyfills')
      .then(() => callback())
      .catch(() => callback()) // ¯\_(ツ)_/¯
  }
}

// Due to the cache-first strategy new builds will not be visible to users
// until after all tabs have been closed. One solution to this is showing an
// "Update available" notification on sw update. See http://bit.ly/2Tzxr18
export function registerServiceWorker() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
    })
  }
}
