
export default function AddCategoryController ($scope, $state, Category) {
  $scope.category = {
    name: '',
    parent_id: 0
  }

  Category.query(categories => {
    $scope.categories = categories
    $scope.categories.unshift({
      id: 0,
      name: 'Choisissez une catégorie'
    })
  })

  $scope.save = () => {
    Category.save($scope.category, () => {
      $state.go('categories.all')
    }, response => {
      $scope.errors = response.data
    })
  }
}

AddCategoryController.$inject = ['$scope', '$state', 'Category']
