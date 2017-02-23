
export default function AddCategoryController ($scope, $state, $stateParams, Category) {
  Category.get({ id: $stateParams.id }, (category) => {
    $scope.category = category
  })

  Category.query((categories) => {
    $scope.categories = categories
    $scope.categories.unshift({
      id: 0,
      name: 'Choisissez une catégorie'
    })
  })

  $scope.save = () => {
    Category.update($scope.category, () => {
      $state.go('categories.all')
    }, (response) => {
      $scope.errors = response.data
    })
  }
}

AddCategoryController.$inject = ['$scope', '$state', '$stateParams', 'Category']
