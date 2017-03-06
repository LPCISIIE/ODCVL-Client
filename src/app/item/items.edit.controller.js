
export default function AddItemController ($scope, $state, $stateParams, BarcodeService, Item, Category, Product, CategoryProduct) {
  Item.get({ id: $stateParams.id }, item => {
    item.purchased_at = new Date(item.purchased_at)
    $scope.item = item
    $scope.displayBarCode()
  })

  $scope.category_id = 0

  Category.query(categories => {
    let allCategories = []
    categories.forEach(category => {
      allCategories.push(category)
      category.sub_categories.forEach(subCategory => {
        allCategories.push(subCategory)
      })
    })

    allCategories.unshift({
      id: 0,
      name: 'Choisissez une catégorie'
    })

    $scope.categories = allCategories
  })

  Product.query(products => {
    $scope.products = products
  })

  $scope.filterProducts = () => {
    CategoryProduct.query({ category_id: $scope.category_id }, products => {
      $scope.products = products
    })
  }

  $scope.updateFilter = (product) => {
    $scope.search = product.name
  }

  $scope.formatDate = (date) => {
    if (date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return ''
  }

  $scope.generateBarCode = () => {
    $scope.item.code = BarcodeService.generate()
    $scope.displayBarCode()
  }

  $scope.displayBarCode = () => {
    BarcodeService.renderer('#barcode')
      .EAN13($scope.item.code)
      .render()
  }

  $scope.save = () => {
    $scope.item.purchased_at = $scope.formatDate($scope.item.purchased_at)
    Item.update($scope.item, () => {
      $state.go('items.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

AddItemController.$inject = ['$scope', '$state', '$stateParams', 'BarcodeService', 'Item', 'Category', 'Product', 'CategoryProduct']
