
export default function AddClientController ($scope, $state, Client, FlashService) {
  $scope.client = {
    nom: '',
    prenom: '',
    organisme: '',
    adresse: '',
    telephone: '',
    email: ''
  }

  Client.query(clients => {
    $scope.clients = clients
    $scope.clients.unshift({
      id: 0,
      name: 'Choisissez un client'
    })
  })

  $scope.save = () => {
    Client.save($scope.client, () => {
      $state.go('clients.all')
      FlashService.Success('client créé avec succès ')
    }, response => {
      $scope.errors = response.data
    })
  }
}

AddClientController.$inject = ['$scope', '$state', 'Client', 'FlashService']
