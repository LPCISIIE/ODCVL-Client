
export default function ItemsController ($scope, $state, $stateParams, Item) {
  const ITEMS_PER_PAGE = 3

  $scope.page = !isNaN($stateParams.page) ? parseInt($stateParams.page) : 1
  $scope.url = $state.href('items.all', { page: '' })

  Item.query({ page: $scope.page }, (items, headers) => {
    $scope.items = items
    $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
  })

  $scope.delete = (item) => {
    Item.delete(item, () => {
      Item.query({ page: $scope.page }, (items, headers) => {
        $scope.items = items
        $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
      })
    })
  }
}

ItemsController.$inject = ['$scope', '$state', '$stateParams', 'Item']
