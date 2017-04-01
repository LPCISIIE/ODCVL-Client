
export default function CategoriesController ($scope, $state, $stateParams, Category, FlashService) {
  const ITEMS_PER_PAGE = 3

  $scope.page = !isNaN($stateParams.page) ? parseInt($stateParams.page) : 1
  $scope.url = $state.href('categories.all', { page: '' })

  Category.query({ page: $scope.page }, (categories, headers) => {
    $scope.categories = categories
    $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
  })

  $scope.delete = (category) => {
    Category.delete(category, () => {
      Category.query({ page: $scope.page }, (categories, headers) => {
        $scope.categories = categories
        $scope.pages = Math.ceil(headers('content-range').split('/')[1] / ITEMS_PER_PAGE)
        FlashService.Success('Catégorie supprimée avec succès ', 500, true)
      })
    })
  }
}

CategoriesController.$inject = ['$scope', '$state', '$stateParams', 'Category', 'FlashService']
