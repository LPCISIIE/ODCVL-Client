
export default function AddCategoryController ($scope, $state, $stateParams, Category, FlashService) {
  Category.get({ id: $stateParams.id }, category => {
    $scope.category = category
  })

  Category.query(categories => {
    $scope.categories = categories
    $scope.categories.unshift({
      id: 0,
      name: 'Choisissez une catégorie'
    })
  })

  $scope.save = () => {
    Category.update($scope.category, () => {
      $state.go('categories.all')
      FlashService.Success('Catégorie mise à jour avec succès ', 500, true)
    }, response => {
      $scope.errors = response.data
      FlashService.Error('erreur lors de la mise à jour de la catégorie')
    })
  }
}

AddCategoryController.$inject = ['$scope', '$state', '$stateParams', 'Category', 'FlashService']
