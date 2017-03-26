
export default function LocationController ($scope, Location, uiGridConstants, FlashService) {
  Location.query(locations => {
    $scope.locations = locations
  })
  $scope.delete = (location) => {
    Location.delete(location, () => {
      Location.query(locations => {
        $scope.locations = locations
      })
    })
  }
  $scope.activate = (locationId) => {
    console.log(locationId)
    Location.activate({ id: locationId }, () => {
      FlashService.Success('Location activée avec succès', 500, true)
      Location.query(locations => {
        $scope.locations = locations
      })
    }, function () {
      FlashService.Error('Cet location ne peux plus être activé', 500, true)
    })
  }
}
LocationController.$inject = ['$scope', 'Location', 'uiGridConstants', 'FlashService']
