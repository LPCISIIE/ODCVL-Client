
export default function LoginController ($scope, $rootScope, $state, AuthService) {
  $scope.user = {}

  $scope.login = () => {
    AuthService.login($scope.user).then(() => {
      $state.go('home')
      $rootScope.logged = true
    }, response => {
      $scope.errors = response.data
    })
  }
}

LoginController.$inject = ['$scope', '$rootScope', '$state', 'AuthService']
