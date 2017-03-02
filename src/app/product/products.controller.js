
export default function ProductsController ($scope, Product, Category, CategoryProduct) {
  $scope.category_id = 0

  Product.query(products => {
    $scope.products = products
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
      Product.query(products => {
        $scope.products = products
      })
    })
  }
}

ProductsController.$inject = ['$scope', 'Product', 'Category', 'CategoryProduct']
