
export default function EditFicheLocationController ($scope, $state, $stateParams, Location, LocationItem, Client, Item, FlashService) {
  let clientId
  let allItems1 = []
  let allItems = []
  LocationItem.get({ id: $stateParams.id }, location => {
    $scope.location = location
    $scope.location.date_debut = new Date(location.date_debut)
    $scope.location.date_fin = new Date(location.date_fin)
    $scope.location.created_at = new Date(location.created_at)
    $scope.location.updated_at = new Date(location.updated_at)
    allItems1 = location.items
    clientId = $scope.location.client_id
    Client.query(clients => {
      $scope.clients = clients
      clients.forEach(client => {
        if (client.id === clientId) {
          $scope.client = client
        }
      })
    })
    Item.query(items => {
      items.forEach(item => {
        allItems1.forEach(item2 => {
          if (item2.id === item.id) {
            allItems.push(item)
          }
        })
      })
    })
    $scope.items = allItems
  })

  $scope.popup1 = {
    opened: false
  }
  $scope.popup2 = {
    opened: false
  }
  $scope.open1 = () => {
    $scope.popup1.opened = true
  }
  $scope.open2 = () => {
    $scope.popup2.opened = true
  }
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  }

  $scope.formatDate = (date) => {
    if (date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return ''
  }
  $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
  $scope.format = $scope.formats[0]
  $scope.altInputFormats = ['M!/d!/yyyy']
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

EditFicheLocationController.$inject = ['$scope', '$state', '$stateParams', 'Location', 'LocationItem', 'Client', 'Item', 'FlashService']
