
export default function AddProductController ($scope, $state, Product, Category) {
  $scope.product = {
    name: '',
    category_id: 0
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

  $scope.save = () => {
    Product.save($scope.product, () => {
      $state.go('products.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

AddProductController.$inject = ['$scope', '$state', 'Product', 'Category']
