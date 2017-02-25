
export default function GuestMiddleware ($state, $rootScope) {
  if ($rootScope.user) {
    if ($state.current.abstract) {
      $state.go('home')
    } else {
      $state.go($state.current)
    }
  }
}

GuestMiddleware.$inject = ['$state', '$rootScope']
