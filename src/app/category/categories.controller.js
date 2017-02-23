
export default function CategoriesController ($scope, Category) {
  Category.query((categories) => {
    $scope.categories = categories
  })

  $scope.delete = (category) => {
    Category.delete(category, () => {
      Category.query((categories) => {
        $scope.categories = categories
      })
    })
  }
}

CategoriesController.$inject = ['$scope', 'Category']
