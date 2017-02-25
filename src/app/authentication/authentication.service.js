
export default class AuthService {
  constructor ($rootScope, JWTService, User) {
    this.$rootScope = $rootScope
    this.JWTService = JWTService
    this.User = User
  }

  check () {
    return this.User.me(user => {
      this.$rootScope.user = user
    }).$promise
  }

  login (credentials) {
    return this.User.login(credentials, jwt => {
      this.JWTService.setAccessToken(jwt.access_token)
      this.JWTService.setRefreshToken(jwt.refresh_token)
    }).$promise
  }

  register (credentials) {
    return this.User.register(credentials).$promise
  }

  refresh () {
    return this.User.refresh({ refresh_token: this.JWTService.getRefreshToken() }, jwt => {
      this.JWTService.setAccessToken(jwt.access_token)
      this.JWTService.setRefreshToken(jwt.refresh_token)
    }, () => {
      this.logout()
    }).$promise
  }

  logout () {
    // User.logout()
    this.$rootScope.user = undefined
    this.JWTService.removeTokens()
  }
}

AuthService.$inject = ['$rootScope', 'JWTService', 'User']
