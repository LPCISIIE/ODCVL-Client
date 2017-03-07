
export default function CategoriesController ($scope, Category, FlashService) {
  Category.query(categories => {
    $scope.categories = categories
  })

  $scope.delete = (category) => {
    Category.delete(category, () => {
      Category.query(categories => {
        $scope.categories = categories
        FlashService.Success('Catégorie supprimée avec succès ', 500, true)
      })
    })
  }
}

CategoriesController.$inject = ['$scope', 'Category', 'FlashService']
