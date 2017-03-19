
export default function AddLocationController ($scope, $state, Client, FlashService, $filter, $uibModal, Item, Location) {
  $scope.client = {
    nom: '',
    prenom: '',
    organisme: '',
    adresse: '',
    telephone: '',
    email: ''
  }
  $scope.person = {
    selectedClient: null
  }
  $scope.location = {
    dateDebut: new Date(),
    dateFin: new Date(),
    status: ''
  }

  $scope.model = {
    barcode: ''
  }
  $scope.cart = {
    items: []
  }
  $scope.cartToSend = {
    items: []
  }
  let locationPost = {}
  $scope.barcode = ''
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
    $scope.person.selectedClient = null
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
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  }
  $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
  $scope.format = $scope.formats[0]
  $scope.altInputFormats = ['M!/d!/yyyy']
  $scope.items = ''

  $scope.manualInsert = function () {
    Item.getbyCode({ id: $scope.barcode }, function (data) {
      addItem(data)
      $scope.barcode = ''
    }, function (error) {
      console.log(error)
    })
  }
  $scope.barcodeScanned = function (barcode) {
    Item.getbyCode({ id: barcode }, function (data) {
      addItem(data)
    }, function (error) {
      console.log(error)
    })
  }
  var addItem = function (item) {
    if (checkDuplicateItem(item.id) === true) {
      FlashService.Success('Item déja existant', 500, true)
      return 0
    }
    var currentItem = checkSameMaterial(item.product.id)
    if (!currentItem) {
      $scope.cart.items.push({
        id: item.id,
        nom: item.product.name,
        qt: 1,
        product_id: item.product.id
      })
      $scope.cartToSend.items.push({
        id: item.id,
        prix: item.prix,
        remarques: item.remarques,
        product_id: item.product.id,
        barcode: item.code
      })
    } else {
      $scope.cart.items[$scope.cart.items.indexOf(currentItem)].qt ++
      $scope.cartToSend.items.push({
        id: item.id,
        product_id: item.product.id,
        prix: item.prix,
        remarques: item.remarques,
        barcode: item.code
      })
    }
  }
  $scope.removeItem = function (index) {
    $scope.cart.items.splice(index, 1)
    var founditems = $filter('filter')($scope.cartToSend.items, {product_id: index.product_id}, true)
    founditems.forEach(item => {
      var itemIndex = $scope.cartToSend.items.indexOf(item)
      $scope.cartToSend.items.splice(itemIndex, 1)
    })
  }
  var checkSameMaterial = function (productId) {
    var found = $filter('filter')($scope.cart.items, {product_id: productId}, true)
    if (found.length) {
      return found[0]
    } else {
      return false
    }
  }
  var checkDuplicateItem = function (itemId) {
    var found = $filter('filter')($scope.cartToSend.items, {id: itemId}, true)
    if (found.length) {
      return true
    } else {
      return false
    }
  }
  $scope.loadDetailForm = function (item) {
    var found = $filter('filter')($scope.cartToSend.items, {product_id: item.product_id}, true)
    $scope.listItems = found
    $scope.nom = item.nom
    $uibModal.open({
      template: require('./modal.html'),
      controller: 'ModalController',
      scope: $scope
    })
  }
  $scope.save = () => {
    if (!$scope.boolForm) {
      locationPost = {
        client_id: $scope.person.selectedClient.id,
        date_debut: $filter('date')($scope.location.dateDebut, 'dd/MM/yyyy'),
        date_fin: $filter('date')($scope.location.dateFin, 'dd/MM/yyyy'),
        status: $scope.location.status,
        items: $scope.cartToSend.items.map(item => item.id)
      }
      Location.save(locationPost, (response) => {
        FlashService.Success('Location crée avec succès', 500, true)
      }, response => {
        $scope.errors = response.data
        FlashService.Error('erreur lors de l\'enregistrement de la location')
      })
    } else {
      Client.save($scope.client, (response) => {
        console.log(response.id)
        locationPost = {
          client_id: response.id,
          date_debut: $filter('date')($scope.location.dateDebut, 'dd/MM/yyyy'),
          date_fin: $filter('date')($scope.location.dateFin, 'dd/MM/yyyy'),
          status: $scope.location.status,
          items: $scope.cartToSend.items.map(item => item.id)
        }
        Location.save(locationPost, (response) => {
          FlashService.Success('Location crée avec succès')
        }, response => {
          $scope.errors = response.data
          FlashService.Error('erreur lors de l\'enregistrement de la location')
        })
      }, response => {
        $scope.errors = response.data
        FlashService.Error('erreur lors de la récupération des  clients')
      })
    }
  }
}
AddLocationController.$inject = ['$scope', '$state', 'Client', 'FlashService', '$filter', '$uibModal', 'Item', 'Location']
