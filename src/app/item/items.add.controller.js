import JsBarcode from 'jsbarcode'

export default function AddItemController ($scope, $state, $stateParams, Item, Category, Product, CategoryProduct) {
  $scope.item = {
    code: '',
    product_id: $stateParams.product_id
  }

  $scope.category_id = 0

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

  Product.query(products => {
    $scope.products = products

    if ($stateParams.product_id) {
      products.forEach((product) => {
        if (product.id === parseInt($stateParams.product_id)) {
          $scope.search = product.name
        }
      })
    }
  })

  $scope.filterProducts = () => {
    CategoryProduct.query({ category_id: $scope.category_id }, products => {
      $scope.products = products
    })
  }

  $scope.updateFilter = (product) => {
    $scope.search = product.name
    $state.go('.', { product_id: product.id })
  }

  $scope.formatDate = (date) => {
    if (date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return ''
  }

  $scope.generateBarCode = () => {
    let code = '300' + Math.ceil(Math.random() * Math.pow(10, 9))

    let weight
    let sum = 0
    for (let i in code) {
      weight = i % 2 === 0 ? 1 : 3
      sum += code.charAt(i) * weight
    }

    let modulo = sum % 10
    if (modulo !== 0) {
      modulo = 10 - modulo
    }

    $scope.item.code = code + modulo
    $scope.displayBarCode()
  }

  $scope.displayBarCode = () => {
    JsBarcode('#barcode')
      .EAN13($scope.item.code)
      .render()
  }

  $scope.save = () => {
    $scope.item.purchased_at = $scope.formatDate($scope.item.purchased_at)
    Item.save($scope.item, () => {
      $state.go('items.all')
    }, response => {
      $scope.errors = response.data
      console.log($scope.errors)
    })
  }
}

AddItemController.$inject = ['$scope', '$state', '$stateParams', 'Item', 'Category', 'Product', 'CategoryProduct']
