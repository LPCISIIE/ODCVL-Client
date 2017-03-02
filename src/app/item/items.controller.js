
export default function ItemsController ($scope, Item) {
  Item.query(items => {
    $scope.items = items
  })

  $scope.delete = (item) => {
    Item.delete(item, () => {
      Item.query(items => {
        $scope.items = items
      })
    })
  }
}

ItemsController.$inject = ['$scope', 'Item']
