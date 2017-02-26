
export default function AuthMiddleware ($state, $rootScope) {
  if (!$rootScope.user) {
    $state.go('login')
  }
}

AuthMiddleware.$inject = ['$state', '$rootScope']
