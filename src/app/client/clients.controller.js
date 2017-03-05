
export default function ClientsController ($scope, Client) {
  Client.query(clients => {
    $scope.clients = clients
  })

  $scope.delete = (client) => {
    Client.delete(client, () => {
      Client.query(clients => {
        $scope.clients = clients
      })
    })
  }
}

ClientsController.$inject = ['$scope', 'Client']
