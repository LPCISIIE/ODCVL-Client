
import GuestMiddleware from './middleware/guest.middleware'
// import AuthMiddleware from './middleware/auth.middleware'

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
      controller: 'LoginCtrl',
      onEnter: GuestMiddleware
    })
    .state('register', {
      url: '/register',
      template: require('./app/authentication/register.html'),
      controller: 'RegisterCtrl',
      onEnter: GuestMiddleware
    })
    .state('categories', {
      abstract: true,
      url: '/categories'/* ,
      onEnter: AuthMiddleware */
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
      url: '/products'/* ,
      onEnter: AuthMiddleware */
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
    .state('items', {
      abstract: true,
      url: '/items'/* ,
       onEnter: AuthMiddleware */
    })
    .state('items.all', {
      url: '',
      template: require('./app/item/items.html'),
      controller: 'ItemsCtrl'
    })
    .state('items.add', {
      url: '/add?product_id',
      template: require('./app/item/items.add.html'),
      controller: 'AddItemCtrl'
    })
}
