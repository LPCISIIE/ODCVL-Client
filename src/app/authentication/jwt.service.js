
export default class JWTService {
  constructor ($window) {
    this.$window = $window
  }

  setAccessToken (token) {
    this.$window.localStorage.setItem('access_token', token)
  }

  setRefreshToken (token) {
    this.$window.localStorage.setItem('refresh_token', token)
  }

  getAccessToken () {
    return this.$window.localStorage.getItem('access_token')
  }

  getRefreshToken () {
    return this.$window.localStorage.getItem('refresh_token')
  }

  removeAccessToken () {
    this.$window.localStorage.removeItem('access_token')
  }

  removeRefreshToken () {
    this.$window.localStorage.removeItem('refresh_token')
  }

  removeTokens () {
    this.removeAccessToken()
    this.removeRefreshToken()
  }
}

JWTService.$inject = ['$window']
