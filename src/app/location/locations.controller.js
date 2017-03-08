
export default function LocationController ($scope, Location, uiGridConstants, FlashService) {
  let status = [
    { value: '0', label: 'Created' },
    { value: '1', label: 'DONE' }
  ]

  $scope.gridOptions = {
    enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
    enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
    enableFiltering: true,
    columnDefs: [
      { field: 'id', displayName: '#ID', width: 90, enableFiltering: false },
      { field: 'date_debut', displayName: 'Date de début', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
      { field: 'date_fin', displayName: 'Date de fin', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
      { field: 'status', displayName: 'Status', filter: { selectOptions: status, type: uiGridConstants.filter.SELECT } },
      { field: 'created_at', displayName: 'Date de création', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
      { field: 'updated_at', displayName: 'Dernière modification', type: 'date', cellFilter: 'date:\'dd/MM/yyyy\'' },
      { field: 'actions',
        displayName: 'Actions',
        width: 190,
        enableFiltering: false,
        cellTemplate: '<div><a  ui-sref="locations.edit({ id: row.entity.id })" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-edit">Edition</span></a><button ng-click="grid.appScope.delete(row.entity)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove">Suppression</span></button></div>'
      }
    ]
  }
  Location.query(locations => {
    $scope.gridOptions.data = locations
  })
  $scope.delete = (location) => {
    console.log('supp')
    Location.delete(location, () => {
      Location.query(locations => {
        $scope.gridOptions.data = locations
      })
    })
  }
}
LocationController.$inject = ['$scope', 'Location', 'uiGridConstants', 'FlashService']
