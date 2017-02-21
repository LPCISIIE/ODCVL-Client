
export default function route ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('./app/home/home.html'),
      controller: 'HomeCtrl'
    })
    .state('login', {
      url: '/login',
      template: require('./app/authentication/login.html'),
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      template: require('./app/authentication/register.html'),
      controller: 'RegisterCtrl'
    })
    .state('categories', {
      abstract: true,
      url: '/categories'
    })
    .state('categories.all', {
      url: '',
      template: require('./app/category/categories.html'),
      controller: 'CategoriesCtrl'
    })
    .state('categories.add', {
      url: '/add',
      template: require('./app/category/categories.add.html'),
      controller: 'AddCategoryCtrl'
    })
    .state('categories.edit', {
      url: '/:id/edit',
      template: require('./app/category/categories.edit.html'),
      controller: 'EditCategoryCtrl'
    })
    .state('products', {
      abstract: true,
      url: '/products'
    })
    .state('products.all', {
      url: '',
      template: require('./app/product/products.html'),
      controller: 'ProductsCtrl'
    })
    .state('products.add', {
      url: '/add',
      template: require('./app/product/products.add.html'),
      controller: 'AddProductCtrl'
    })
    .state('products.edit', {
      url: '/:id/edit',
      template: require('./app/product/products.edit.html'),
      controller: 'EditProductCtrl'
    })
}
