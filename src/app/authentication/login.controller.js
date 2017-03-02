
export default function LoginController ($scope, $state, AuthService) {
  $scope.user = {}

  $scope.login = () => {
    AuthService.login($scope.user).then(() => {
      $state.go('home')
    }, response => {
      $scope.errors = response.data
    })
  }
}

LoginController.$inject = ['$scope', '$state', 'AuthService']
