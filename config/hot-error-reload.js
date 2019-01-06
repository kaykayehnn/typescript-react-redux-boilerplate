if (module.hot) {
  // Hardcoded in react-error-overlay.
  var ERROR_OVERLAY_ZINDEX = '2147483647'

  module.hot.addStatusHandler(function (status) {
    var isOverlayVisible = false
    var iframes = document.querySelectorAll('iframe')

    // Check if any of the iframes is react-error-overlay
    for (var i = 0; i < iframes.length && !isOverlayVisible; i++) {
      isOverlayVisible = iframes[i].style.zIndex === ERROR_OVERLAY_ZINDEX
    }

    // Page hasn't reloaded after compile errors, force reload.
    if (status === 'apply' && isOverlayVisible) {
      console.log('Forcing reload...')

      window.location.reload()
    }
  })
}
