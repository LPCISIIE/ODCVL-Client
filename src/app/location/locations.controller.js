
export default function LocationController ($scope, Location, uiGridConstants) {
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
      { field: 'actions', displayName: 'Actions', width: 90, enableFiltering: false, cellTemplate: '<div><a><span class="glyphicon glyphicon-edit" ng-click="grid.appScope.edit(row.entity.id)"></span></a><a><span class="glyphicon glyphicon-info-sign" ng-click="grid.appScope.info(row.entity.id)"></span></a></div>' }
    ]
  }

  Location.query(locations => {
    $scope.gridOptions.data = locations
  })

  $scope.edit = (value) => {
  }

  $scope.info = (value) => {
  }
}

LocationController.$inject = ['$scope', 'Location', 'uiGridConstants']
