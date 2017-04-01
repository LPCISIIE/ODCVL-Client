
export default function ProductsController ($scope, $state, $stateParams, Product, Category, CategoryProduct) {
  const ITEMS_PER_PAGE = 3

  $scope.page = !isNaN($stateParams.page) ? parseInt($stateParams.page) : 1
  $scope.url = $state.href('products.all', { page: '' })

  $scope.category_id = 0

  Product.query({ page: $scope.page }, (products, headers) => {
    $scope.products = products
    $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
  })

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
    CategoryProduct.query({ category_id: $scope.category_id }, products => {
      $scope.products = products
    })
  }

  $scope.delete = (product) => {
    Product.delete(product, () => {
      Product.query({ page: $scope.page }, (products, headers) => {
        $scope.products = products
        $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
      })
    })
  }
}

ProductsController.$inject = ['$scope', '$state', '$stateParams', 'Product', 'Category', 'CategoryProduct']
