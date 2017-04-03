
export default function LocationController ($scope, $state, $stateParams, Location, uiGridConstants, FlashService) {
  const ITEMS_PER_PAGE = 20

  $scope.page = !isNaN($stateParams.page) ? parseInt($stateParams.page) : 1
  $scope.url = $state.href('locations.all', { page: '' })

  let loadLocations = () => {
    Location.query({ page: $scope.page }, (locations, headers) => {
      $scope.locations = locations
      $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
    })
  }

  loadLocations()

  $scope.delete = (location) => {
    Location.delete(location, loadLocations)
  }

  $scope.activate = (locationId) => {
    Location.activate({ id: locationId }, () => {
      FlashService.Success('Location activée avec succès', 500, true)
      loadLocations()
    }, () => {
      FlashService.Error('Cet location ne peux plus être activé', 500, true)
    })
  }
}

LocationController.$inject = ['$scope', '$state', '$stateParams', 'Location', 'uiGridConstants', 'FlashService']
