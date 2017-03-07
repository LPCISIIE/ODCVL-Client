
export default function AddCategoryController ($scope, $state, Category, FlashService) {
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
      FlashService.Success('Catagorie ajoutée avec succès ', 500, true)
    }, response => {
      $scope.errors = response.data
      FlashService.Error('erreur lors de l\'ajout de la nouvelle catégorie ')
    })
  }
}

AddCategoryController.$inject = ['$scope', '$state', 'Category', 'FlashService']
