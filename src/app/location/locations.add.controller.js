
export default function AddLocationController ($scope, $state, Client, FlashService, $filter, Item) {
  $scope.client = {
    nom: '',
    prenom: '',
    organisme: '',
    adresse: '',
    telephone: '',
    email: ''
  }
  $scope.location = {
    date_debut: '',
    date_fin: '',
    status: ''
  }

  $scope.model = {
    barcode: ''
  }
  $scope.cart = {
    items: []
  }
  $scope.barcodeScanned = (barcode) => {
    console.log('callback received barcode: ' + barcode)
    $scope.model.barcode = barcode
  }
  $scope.disabled = undefined
  $scope.enable = function () {
    $scope.disabled = false
  }
  $scope.disable = function () {
    $scope.disabled = true
  }
  $scope.clear = function () {
    $scope.person.selected = undefined
  }
  Client.query(clients => {
    $scope.people = clients
  })
  $scope.boolForm = false
  $scope.showForm = function () {
    $scope.boolForm = true
  }
  $scope.hideForm = function () {
    $scope.boolForm = false
  }
  $scope.popup1 = {
    opened: false
  }
  $scope.popup2 = {
    opened: false
  }
  $scope.open1 = function () {
    $scope.popup1.opened = true
  }
  $scope.open2 = function () {
    $scope.popup2.opened = true
  }
  // $scope.zzz = $filter('date')(new Date('2014-03-23T23:00:00.000Z'), 'yyyy-MM-dd')
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  }
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
  $scope.format = $scope.formats[0]
  $scope.altInputFormats = ['M!/d!/yyyy']
  $scope.items = ''
  $scope.barcodeScanned = function (barcode) {
    Item.getbyCode({ id: barcode }, function (data) {
      addItem(data)
    }, function (error) {
      console.log(error)
    })
  }
  var addItem = function (item) {
    var currentItem = duplicated(item.product.id)
    if (!currentItem) {
      $scope.cart.items.push({
        nom: item.product.name,
        qt: 1,
        product_id: item.product.id
      })
    } else {
      $scope.cart.items[$scope.cart.items.indexOf(currentItem)].qt ++
    }
  }
  $scope.removeItem = function (index) {
    $scope.cart.items.splice(index, 1)
  }
  var duplicated = function (productId) {
    var found = $filter('filter')($scope.cart.items, {product_id: productId}, true)
    if (found.length) {
      return found[0]
    } else {
      return false
    }
  }
}
AddLocationController.$inject = ['$scope', '$state', 'Client', 'FlashService', '$filter', 'Item']
