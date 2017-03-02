
export default function AddItemController ($scope, $state, $stateParams, Item, Category, Product, CategoryProduct) {
  $scope.item = {
    code: '',
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
  }

  $scope.checked = () => {
    console.log('Checked')
  }

  $scope.save = () => {
    Item.save($scope.item, () => {
      $state.go('items.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

AddItemController.$inject = ['$scope', '$state', '$stateParams', 'Item', 'Category', 'Product', 'CategoryProduct']
