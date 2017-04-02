
export default function ClientsController ($scope, $state, $stateParams, Client, FlashService) {
  const ITEMS_PER_PAGE = 3

  $scope.page = !isNaN($stateParams.page) ? parseInt($stateParams.page) : 1
  $scope.url = $state.href('clients.all', { page: '' })

  Client.query({ page: $scope.page }, (clients, headers) => {
    $scope.clients = clients
    $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
  })

  $scope.delete = (client) => {
    Client.delete(client, () => {
      Client.query({ page: $scope.page }, (clients, headers) => {
        FlashService.Success('Client supprimé avec succès ', 500, true)
        $scope.clients = clients
        $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
      })
    })
  }
}

ClientsController.$inject = ['$scope', '$state', '$stateParams', 'Client', 'FlashService']
