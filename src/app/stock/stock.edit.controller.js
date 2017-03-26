
export default function EditStockController ($scope, $state, $stateParams, Product, Category, CategoryProduct, FlashService) {
  $scope.category_id = 0
  Product.query(products => {
    $scope.products = products
    products.forEach(product => {
      if (product.items.length === 0) {
        FlashService.Error('Un ou plusieurs produits en rupture de stock ', 500, true)
      }
    })
  })
  $scope.tableRowExpanded = false
  $scope.tableRowIndexExpandedCurr = ''
  $scope.tableRowIndexExpandedPrev = ''
  $scope.storeIdExpanded = ''

  $scope.dayDataCollapseFn = function () {
    $scope.dayDataCollapse = []
    for (var i = 0; i < $scope.products.length; i += 1) {
      $scope.dayDataCollapse.push(false)
    }
  }
  $scope.selectTableRow = function (index, productId) {
    if (typeof $scope.dayDataCollapse === 'undefined') {
      $scope.dayDataCollapseFn()
    }
    if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === '' && $scope.storeIdExpanded === '') {
      $scope.tableRowIndexExpandedPrev = ''
      $scope.tableRowExpanded = true
      $scope.tableRowIndexExpandedCurr = index
      $scope.storeIdExpanded = productId
      $scope.dayDataCollapse[index] = true
    } else if ($scope.tableRowExpanded === true) {
      if ($scope.tableRowIndexExpandedCurr === index && $scope.storeIdExpanded === productId) {
        $scope.tableRowExpanded = false
        $scope.tableRowIndexExpandedCurr = ''
        $scope.storeIdExpanded = ''
        $scope.dayDataCollapse[index] = false
      } else {
        $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr
        $scope.tableRowIndexExpandedCurr = index
        $scope.storeIdExpanded = productId
        $scope.dayDataCollapse[$scope.tableRowIndexExpandedCurr] = true
      }
    }
  }
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
  $scope.filterProducts = () => {
    let allProducts = []
    CategoryProduct.query({ category_id: $scope.category_id }, products => {
      products.forEach(product => {
        Product.query(products2 => {
          products2.forEach(product1 => {
            if (product1.id === product.id) {
              allProducts.push(product1)
            }
          })
        })
      })
      $scope.products = allProducts
      console.log(products)
    })
  }
  $scope.save = () => {
    Product.update($scope.product, () => {
      $state.go('stock.all')
      FlashService.clearFlashMessage()
    }, response => {
      $scope.errors = response.data
    })
  }
}

EditStockController.$inject = ['$scope', '$state', '$stateParams', 'Product', 'Category', 'CategoryProduct', 'FlashService']
