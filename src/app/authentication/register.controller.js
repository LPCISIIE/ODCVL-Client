
export default function RegisterController ($scope, $rootScope, $state, AuthService) {
  $scope.user = {}
  $rootScope.logged = false
  $scope.register = () => {
    AuthService.register($scope.user).then(() => {
      $state.go('login')
    }, response => {
      $scope.errors = response.data
    })
  }
}

RegisterController.$inject = ['$scope', '$rootScope', '$state', 'AuthService']
