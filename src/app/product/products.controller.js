
export default function ProductsController ($scope, Product) {
  Product.query(products => {
    $scope.products = products
  })

  $scope.delete = (product) => {
    Product.delete(product, () => {
      Product.query(products => {
        $scope.products = products
      })
    })
  }
}

ProductsController.$inject = ['$scope', 'Product']
