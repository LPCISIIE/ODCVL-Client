
export default function JWTInterceptor (JWTService, $injector) {
  return {
    request: config => {
      let token = JWTService.getAccessToken()
      if (token != null) {
        config.headers.authorization = 'Bearer ' + token
      }

      return config
    },
    responseError: rejection => {
      if (rejection.status === 401) {
        let AuthService = $injector.get('AuthService')
        if (JWTService.getRefreshToken() != null) {
          AuthService.refresh()
        } else {
          AuthService.logout()
        }
      }
    }
  }
}

JWTInterceptor.$inject = ['JWTService', '$injector']
