
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
  let today = new Date()
  $scope.location = {
    dateDebut: new Date(),
    dateFin: today.setDate(today.getDate() + 1),
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
  $scope.enable = () => {
    $scope.disabled = false
  }
  $scope.disable = () => {
    $scope.disabled = true
  }
  $scope.clear = () => {
    $scope.person.selected = undefined
  }
  $scope.boolForm = false
  $scope.showForm = () => {
    $scope.person.selectedClient = null
    $scope.boolForm = true
    $scope.client_selection = false
  }
  $scope.hideForm = () => {
    $scope.boolForm = false
    $scope.client_selection = true
  }
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
  $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
  $scope.format = $scope.formats[0]
  $scope.altInputFormats = ['M!/d!/yyyy']
  $scope.items = ''

  $scope.manualInsert = () => {
    Item.getbyCode({ id: $scope.barcode }, function (data) {
      addItem(data)
      $scope.barcode = ''
    }, function () {
      FlashService.Error('Item Introuvable', 500, true)
      $scope.barcode = ''
    })
  }
  $scope.barcodeScanned = (barcode) => {
    Item.getbyCode({ id: barcode }, function (data) {
      addItem(data)
      $scope.barcode = ''
    }, function () {
      FlashService.Error('Item Introuvable', 500, true)
      $scope.barcode = ''
    })
  }

  let loadUsers = () => {
    Client.query(clients => {
      $scope.people = clients
    })
  }
  loadUsers()
  let addItem = (item) => {
    if (checkDuplicateItem(item.id) === true) {
      FlashService.Error('Item déja existant', 500, true)
      return 0
    }
    if (item.status !== 'disponible') {
      FlashService.Error('Item non disponible', 500, true)
      return 0
    }
    let currentItem = checkSameMaterial(item.product.id)
    if (!currentItem) {
      $scope.cart.items.push({
        id: item.id,
        nom: item.product.name,
        qt: 1,
        prix: item.product.prix,
        prix_lot: item.product.prix,
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
      FlashService.Success('Item ajouté au panier', 500, true)
    } else {
      let it = $scope.cart.items[$scope.cart.items.indexOf(currentItem)]
      it.qt ++
      it.prix_lot = parseFloat(it.prix_lot) + parseFloat(it.prix)
      $scope.cartToSend.items.push({
        id: item.id,
        product_id: item.product.id,
        prix: item.product.prix,
        remarques: item.remarques,
        barcode: item.code
      })
      $scope.price.total = parseFloat(item.product.prix) + parseFloat($scope.price.total)
      FlashService.Success('Item ajouté au panier', 500, true)
    }
  }
  $scope.removeItem = (index) => {
    let itemsprice = parseFloat(index.prix) * parseFloat(index.qt)
    $scope.price.total = parseFloat($scope.price.total) - itemsprice
    $scope.cart.items.splice($scope.cart.items.indexOf(index), 1)
    let founditems = $filter('filter')($scope.cartToSend.items, {product_id: index.product_id}, true)
    founditems.forEach(item => {
      let itemIndex = $scope.cartToSend.items.indexOf(item)
      $scope.cartToSend.items.splice(itemIndex, 1)
    })
  }
  let checkSameMaterial = (productId) => {
    let found = $filter('filter')($scope.cart.items, {product_id: productId}, true)
    if (found.length) {
      return found[0]
    } else {
      return false
    }
  }
  let checkDuplicateItem = (itemId) => {
    let found = $filter('filter')($scope.cartToSend.items, {id: itemId}, true)
    if (found.length) {
      return true
    } else {
      return false
    }
  }
  $scope.loadDetailForm = (item) => {
    let found = $filter('filter')($scope.cartToSend.items, {product_id: item.product_id}, true)
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
        $state.go('locations.all')
      }, response => {
        $scope.hideForm()
        $scope.errors = response.data
        if (response.data['date_fin']) {
          $scope.nextstep = true
        }
        FlashService.Error('erreur lors de l\'enregistrement de la location')
      })
    } else {
      Client.save($scope.client, (response) => {
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
