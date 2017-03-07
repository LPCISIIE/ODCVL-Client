
export default function EditLocationController ($scope, $state, $stateParams, Location, FlashService) {
  Location.get({ id: $stateParams.id }, location => {
    $scope.location = location
  })

  $scope.save = () => {
    Location.update($scope.location, () => {
      $state.go('locations.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

EditLocationController.$inject = ['$scope', '$state', '$stateParams', 'Location', 'FlashService']
