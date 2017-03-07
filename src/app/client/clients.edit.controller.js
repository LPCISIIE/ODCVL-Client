
export default function EditClientController ($scope, $state, $stateParams, Client, FlashService) {
  Client.get({ id: $stateParams.id }, client => {
    $scope.client = client
  })

  $scope.save = () => {
    Client.update($scope.client, () => {
      $state.go('clients.all')
      FlashService.Success('Client mis à jour avec succès ', 500, true)
    }, response => {
      $scope.errors = response.data
      FlashService.Error("erreur lors de la mise à jour du client")
    })
  }
}

EditClientController.$inject = ['$scope', '$state', '$stateParams', 'Client', 'FlashService']
