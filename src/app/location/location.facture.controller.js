
export default function FactureController ($scope, $state, $stateParams, Location, LocationItem, Client, Item, FlashService, $filter, JsPdf, html2canvas) {
  $scope.client = {}
  $scope.location = {}
  $scope.items = {}
  // $scope.total = 0
  Location.get({ id: $stateParams.id }, location => {
    let arritems = []
    $scope.location = location
    $scope.location.date_debut = new Date(location.date_debut)
    $scope.location.date_fin = new Date(location.date_fin)
    $scope.location.created_at = new Date(location.created_at)
    location.items.forEach(item => {
      Item.get({ id: item.id }, singleitem => {
        if (checkSameMaterial(arritems, singleitem.product_id)) {
          let it = arritems[arritems.indexOf(checkSameMaterial(arritems, singleitem.product_id))]
          it.qt++
        } else {
          singleitem.qt = 1
          arritems.push(singleitem)
        }
      })
    })
    Client.get({ id: location.client_id }, client => {
      $scope.client = client
    })
    $scope.items = arritems
  }, response => {
  })
  let checkSameMaterial = (arr, productId) => {
    let found = $filter('filter')(arr, {product_id: productId}, true)
    if (found.length) {
      return found[0]
    } else {
      return false
    }
  }
  $scope.save = () => {
    var doc = new JsPdf()
    doc.addHTML($('#container').get(0), function () {
      doc.save('facture.pdf')
    })
  }
  $scope.print = () => {
    $('#container').print({})
  }
}

FactureController.$inject = ['$scope', '$state', '$stateParams', 'Location', 'LocationItem', 'Client', 'Item', 'FlashService', '$filter', 'JsPdf', 'html2canvas']
