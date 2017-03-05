
export default function EditClientController ($scope, $state, $stateParams, Client) {
  Client.get({ id: $stateParams.id }, client => {
    $scope.client = client
  })

  $scope.save = () => {
    Client.update($scope.client, () => {
      $state.go('clients.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

EditClientController.$inject = ['$scope', '$state', '$stateParams', 'Client']
