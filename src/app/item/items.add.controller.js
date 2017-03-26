
export default function AddItemController ($scope, $state, $stateParams, BarcodeService, Item, Category, Product, CategoryProduct) {
  $scope.item = {
    code: '',
    status: '',
    reparations: '',
    remarques: '',
    product_id: $stateParams.product_id
  }

  $scope.category_id = 0

  Category.query(categories => {
    let allCategories = []
    categories.forEach(category => {
      allCategories.push(category)
      category.sub_categories.forEach(subCategory => {
        allCategories.push(subCategory)
      })
    })
    $scope.items = [{
      id: 1,
      status: 'Loué'

    }, {
      id: 2,
      status: 'Disponible'
    }, {
      id: 3,
      status: 'Indisponible'
    }]
    $scope.selected = $scope.items[0]
    allCategories.unshift({
      id: 0,
      name: 'Choisissez une catégorie'
    })

    $scope.categories = allCategories
  })

  Product.query(products => {
    $scope.products = products

    if ($stateParams.product_id) {
      products.forEach((product) => {
        if (product.id === parseInt($stateParams.product_id)) {
          $scope.search = product.name
        }
      })
    }
  })

  $scope.filterProducts = () => {
    CategoryProduct.query({ category_id: $scope.category_id }, products => {
      $scope.products = products
    })
  }

  $scope.updateFilter = (product) => {
    $scope.search = product.name
    $state.go('.', { product_id: product.id })
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
    $scope.item.status = $scope.selected.status
    Item.save($scope.item, () => {
      $state.go('items.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

AddItemController.$inject = ['$scope', '$state', '$stateParams', 'BarcodeService', 'Item', 'Category', 'Product', 'CategoryProduct']
