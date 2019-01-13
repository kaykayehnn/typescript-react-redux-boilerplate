if (module.hot) {
  // Hardcoded in react-error-overlay.
  let ERROR_OVERLAY_ZINDEX = '2147483647'

  module.hot.addStatusHandler(function (status) {
    let isOverlayVisible = false
    let iframes = document.querySelectorAll('iframe')

    // Check if any of the iframes is react-error-overlay
    for (let i = 0; i < iframes.length && !isOverlayVisible; i++) {
      isOverlayVisible = iframes[i].style.zIndex === ERROR_OVERLAY_ZINDEX
    }

    // Page hasn't reloaded after compile errors, force reload.
    if (status === 'apply' && isOverlayVisible) {
      console.log('Forcing reload...')

      window.location.reload()
    }
  })
}
