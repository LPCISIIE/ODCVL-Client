
export default function BarcodeScannerDirective () {
  return {
    restrict: 'A',
    scope: {
      callback: '=barcodeScanner'
    },
    link: function postLink (scope, iElement, iAttrs) {
      var zeroCode = 48
      var nineCode = 57
      var enterCode = 13
      var minLength = 3
      var delay = 300
      // Variables
      let pressed = false
      var enterPressedLast = false
      var chars = []
      var startTime = void 0
      var endTime = void 0
      jQuery(document).keypress(function (e) {
        if (chars.length === 0) {
          startTime = new Date().getTime()
        } else {
          endTime = new Date().getTime()
        }
        // Register characters and enter key
        if (e.which >= zeroCode && e.which <= nineCode) {
          chars.push(String.fromCharCode(e.which))
        }
        enterPressedLast = (e.which === enterCode)
        if (pressed === false) {
          setTimeout(function () {
            if (chars.length >= minLength && enterPressedLast) {
              var barcode = chars.join('')
              console.log('barcode : ' + barcode + ', scan time (ms): ' + (endTime - startTime))
              if (typeof scope.callback === 'function') {
                scope.$apply(function () {
                  scope.callback(barcode)
                })
              }
            }
            chars = []
            pressed = false
          }, delay)
        }
        pressed = true
      })
    }
  }
}
