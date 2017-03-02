
export default function EditProductController ($scope, $state, $stateParams, Product, Category) {
  Product.get({ id: $stateParams.id }, product => {
    $scope.product = product
    $scope.product.category_id = product.categories[0].id
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

  $scope.save = () => {
    Product.update($scope.product, () => {
      $state.go('products.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

EditProductController.$inject = ['$scope', '$state', '$stateParams', 'Product', 'Category']
