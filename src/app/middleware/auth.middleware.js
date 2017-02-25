
export default function AuthMiddleware ($state, $rootScope) {
  if (!$rootScope.user) {
    if ($state.current.abstract) {
      $state.go('home')
    } else {
      $state.go($state.current)
    }
  }
}

AuthMiddleware.$inject = ['$state', '$rootScope']
