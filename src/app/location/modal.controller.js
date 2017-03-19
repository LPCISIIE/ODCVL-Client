
export default function ModalController ($scope, $filter, $uibModalInstance) {
  $scope.remove = function (index) {
    // Remove Item from Modal list
    $scope.listItems = $scope.listItems.splice(index, 1)

    // Decremante quantity of item's material in cart
    var found = $filter('filter')($scope.cart.items, {product_id: index.product_id}, true)
    var indexItem = $scope.cart.items.indexOf(found[0])
    $scope.cart.items[indexItem].qt --

    // Remove materiel from cart if quantity == 0
    if ($scope.cart.items[$scope.cart.items.indexOf(found[0])].qt === 0) {
      $scope.cart.items.splice(indexItem, 1)
      $uibModalInstance.close(true)
    }
    // Remove Item from cart to send
    var founditem = $filter('filter')($scope.cartToSend.items, {id: index.id}, true)
    var itemIndex = $scope.cartToSend.items.indexOf(founditem[0])
    $scope.cartToSend.items.splice(itemIndex, 1)
  }
  $scope.close = () => {
    $uibModalInstance.close(true)
  }
}
ModalController.$inject = ['$scope', '$filter', '$uibModalInstance']
