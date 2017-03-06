export default class FlashService {

  constructor ($rootScope) {
    this.$rootScope = $rootScope
  }
  clearFlashMessage () {
    var flash = this.$rootScope.flash
    if (flash) {
      if (!flash.keepAfterLocationChange) {
        delete this.$rootScope.flash
      } else {
        // only keep for a single location change
        flash.keepAfterLocationChange = false
      }
    }
  }
  initService ($rootScope) {
    this.$rootScope.$on('$locationChangeStart', function ($rootScope) {
      this.clearFlashMessage()
    })
  }
  Success (message, keepAfterLocationChange) {
    this.$rootScope.flash = {
      message: message,
      type: 'success',
      keepAfterLocationChange: keepAfterLocationChange
    }
  }
  Error (message, keepAfterLocationChange) {
    this.$rootScope.flash = {
      message: message,
      type: 'error',
      keepAfterLocationChange: keepAfterLocationChange
    }
  }
}

FlashService.$inject = ['$rootScope']
