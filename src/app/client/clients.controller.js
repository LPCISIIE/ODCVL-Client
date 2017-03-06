
export default function ClientsController ($scope, Client, FlashService) {
  Client.query(clients => {
    $scope.clients = clients
  })

  $scope.delete = (client) => {
    Client.delete(client, () => {
      Client.query(clients => {
        FlashService.Success('Client supprimé avec succès ', 500, true)
        $scope.clients = clients
      })
    })
  }
}

ClientsController.$inject = ['$scope', 'Client', 'FlashService']
