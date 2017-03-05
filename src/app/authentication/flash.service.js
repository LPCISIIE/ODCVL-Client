export default class FlashService {

  constructor ($rootScope) {
    this.$rootScope = $rootScope
    this.initService()
  }

  initService () {
    this.$rootScope.$on('$locationChangeStart', function () {
      this.clearFlashMessage()
    })
  }
  clearFlashMessage () {
    var flash = this.$rootScope.flash
    if (this.$rootScope.flash) {
      if (!flash.keepAfterLocationChange) {
        delete (this.$rootScope.flash)
      } else {
        flash.keepAfterLocationChange = false
      }
    }
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
