
export default function BarCodePrinter ($scope, BarcodeService) {
  $scope.printable = {
    items: ['123456789012', '123456789012']
  }
  $scope.item = {
    code: ''
  }

  $scope.displayBarCode = (imgContainer, barcode) => {
    // BarcodeService.renderer('#barcode')
    BarcodeService.renderer(imgContainer)
        .EAN13(barcode)
        .render()
  }
  $scope.addItem = () => {
    let s = BarcodeService.generate()
    $('#moncode').empty()
    $scope.printable.items.push(s)
    display()
  }
  let display = () => {
    let index = 0
    $scope.printable.items.forEach(item => {
      let img = document.createElement('img')
      img.name = 'img' + index
      $('#moncode').append(img)
      BarcodeService.renderer(img)
        .EAN13(item)
        .render()
      index++
    })
  }
}

BarCodePrinter.$inject = ['$scope', 'BarcodeService']
