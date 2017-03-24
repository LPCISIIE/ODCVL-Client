
export default function AddLocationController ($scope, $state, Client, FlashService, $filter, $uibModal, Item, Location) {
  $scope.client = {
    nom: '',
    prenom: '',
    organisme: '',
    adresse: '',
    telephone: '',
    email: ''
  }
  $scope.nextstep = true
  $scope.switch = () => {
    $scope.nextstep = !$scope.nextstep
  }
  $scope.price = {
    total: 0.00
  }
  $scope.person = {
    selectedClient: null
  }
  $scope.client_selection = true
  $scope.location = {
    dateDebut: new Date(),
    dateFin: new Date(),
    status: 'inactive'
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
  $scope.boolForm = false
  $scope.showForm = function () {
    $scope.person.selectedClient = null
    $scope.boolForm = true
    $scope.client_selection = false
  }
  $scope.hideForm = function () {
    // $scope.person.selectedClient = null
    $scope.boolForm = false
    $scope.client_selection = true
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

  var loadUsers = () => {
    Client.query(clients => {
      $scope.people = clients
    })
  }
  loadUsers()
  var addItem = function (item) {
    if (checkDuplicateItem(item.id) === true) {
      FlashService.Success('Item déja existant', 500, true)
      return 0
    }
    var currentItem = checkSameMaterial(item.product.id)
    if (!currentItem) {
      console.log(item)
      $scope.cart.items.push({
        id: item.id,
        nom: item.product.name,
        qt: 1,
        prix: item.product.prix,
        product_id: item.product.id
      })
      $scope.cartToSend.items.push({
        id: item.id,
        prix: item.product.prix,
        remarques: item.remarques,
        product_id: item.product.id,
        barcode: item.code
      })
      $scope.price.total = parseFloat(item.product.prix) + parseFloat($scope.price.total)
    } else {
      $scope.cart.items[$scope.cart.items.indexOf(currentItem)].qt ++
      $scope.cartToSend.items.push({
        id: item.id,
        product_id: item.product.id,
        prix: item.product.prix,
        remarques: item.remarques,
        barcode: item.code
      })
      $scope.price.total = parseFloat(item.product.prix) + parseFloat($scope.price.total)
    }
  }
  $scope.removeItem = function (index) {
    var itemsprice = parseFloat(index.prix) * parseFloat(index.qt)
    console.log(index.qt)
    $scope.price.total = parseFloat($scope.price.total) - itemsprice
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
        console.log('success')
        FlashService.Success('Location crée avec succès', 500, true)
      }, response => {
        $scope.hideForm()
        $scope.errors = response.data
        FlashService.Error('erreur lors de l\'enregistrement de la location')
      })
    } else {
      Client.save($scope.client, (response) => {
        console.log(response.id)
        let rid = response
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
          $scope.hideForm()
          loadUsers()
          $scope.person.selectedClient = rid
          $scope.errors = response.data
          FlashService.Error('erreur lors de l\'enregistrement de la location')
        })
      }, response => {
        $scope.showForm()
        $scope.errors = response.data
        $scope.nextstep = true
        FlashService.Error('erreur lors de la récupération des  clients')
      })
    }
  }
}
AddLocationController.$inject = ['$scope', '$state', 'Client', 'FlashService', '$filter', '$uibModal', 'Item', 'Location']
