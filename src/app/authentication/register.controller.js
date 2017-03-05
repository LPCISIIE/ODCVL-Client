
export default function RegisterController ($scope, $state, AuthService) {
  $scope.user = {}

  $scope.register = () => {
    AuthService.register($scope.user).then(() => {
      $state.go('login')
    }, response => {
      $scope.errors = response.data
    })
  }
}

RegisterController.$inject = ['$scope', '$state', 'AuthService']
