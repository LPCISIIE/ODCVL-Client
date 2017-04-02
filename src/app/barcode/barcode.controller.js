
export default function BarCodePrinter ($scope, BarcodeService, Item, FlashService, JsPdf) {
  $scope.printable = {
    items: []
  }
  $scope.cart = {
    items: []
  }
  Item.query(items => {
    $scope.items = items
  })
  $scope.itemlist = {
    selectedItem: null
  }
  $scope.currentPage = 1
  $scope.totalItems = $scope.printable.items.length
  $scope.itemsPerPage = 5
  $scope.setPage = (pageNo) => {
    $scope.currentPage = pageNo
  }
  $scope.pageChanged = () => {
    console.log('Page changed to: ' + $scope.currentPage)
  }
  $scope.displayBarCode = (imgContainer, barcode) => {
    BarcodeService.renderer(imgContainer)
        .EAN13(barcode)
        .render()
  }
  $scope.addItem = () => {
    let s = $scope.itemlist.selectedItem
    $('#moncode').empty()
    $scope.printable.items.push(s)
    $scope.totalItems = $scope.printable.items.length
    $scope.itemlist.selectedItem = null
    display()
  }
  $scope.deleteItem = (index) => {
    $scope.printable.items.splice($scope.printable.items.indexOf(index), 1)
  }
  let display = () => {
    $('#moncode').empty()
    let index = 0
    $scope.printable.items.forEach(item => {
      let img = document.createElement('img')
      img.name = 'img' + index
      $('#moncode').append(img)
      try {
        BarcodeService.renderer(img).EAN13(item.code).render()
      } catch (error) {
        FlashService.Error(error, 500, true)
        return 0
      }
      index++
      $scope.itemlist.selectedItem = null
    })
    $('#moncode').hide()
  }
  $scope.print = () => {
    display()
    $('#moncode').print({
      prepend: '<h1 class="text-center">Impression de code barres</h1>'
    })
  }
}

BarCodePrinter.$inject = ['$scope', 'BarcodeService', 'Item', 'FlashService', 'JsPdf']
