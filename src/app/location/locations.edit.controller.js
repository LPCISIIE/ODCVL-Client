
export default function EditLocationController ($scope, $state, $stateParams, Location, Client, FlashService) {
  Location.get({ id: $stateParams.id }, location => {
    $scope.location = location
    location.date_debut = new Date(location.date_debut)
    location.date_fin = new Date(location.date_fin)
    location.created_at = new Date(location.created_at)
    location.updated_at = new Date(location.updated_at)
  })

  Client.query(clients => {
    $scope.clients = clients
  })
  $scope.formatDate = (date) => {
    if (date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return ''
  }
  $scope.save = () => {
    $scope.location.date_debut = $scope.formatDate($scope.location.date_debut)
    $scope.location.date_fin = $scope.formatDate($scope.location.date_fin)
    $scope.location.created_at = $scope.formatDate($scope.location.created_at)
    $scope.location.updated_at = $scope.formatDate($scope.location.updated_at)
    Location.update($scope.location, () => {
      $state.go('locations.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

EditLocationController.$inject = ['$scope', '$state', '$stateParams', 'Location', 'Client', 'FlashService']
