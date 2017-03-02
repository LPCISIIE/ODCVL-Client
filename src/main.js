import './assets/scss/app.scss'

import angular from 'angular'
import resource from 'angular-resource'
import router from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'

import config from './config'
import JWTService from './app/authentication/jwt.service'
import AuthService from './app/authentication/authentication.service'

import User from './app/user/user'
import Category from './app/category/category'
import CategoryProduct from './app/category/category.product'
import Product from './app/product/product'
import Item from './app/item/item'

import TopbarDirective from './app/topbar/topbar.directive'
import FieldErrorsDirective from './app/common/field-errors.directive'
import HasErrorDirective from './app/common/has-error.directive'

import LoginController from './app/authentication/login.controller'
import RegisterController from './app/authentication/register.controller'
import HomeController from './app/home/home.controller'
import CategoriesController from './app/category/categories.controller'
import AddCategoryController from './app/category/categories.add.controller'
import EditCategoryController from './app/category/categories.edit.controller'
import ProductsController from './app/product/products.controller'
import AddProductController from './app/product/products.add.controller'
import EditProductController from './app/product/products.edit.controller'
import ItemsController from './app/item/items.controller'
import AddItemController from './app/item/items.add.controller'

export default angular.module('app', [resource, router, uiBootstrap])
  .constant('API', {
    url: 'http://localhost/private/ODCVL/public'
  })
  .factory('User', User)
  .service('JWTService', JWTService)
  .service('AuthService', AuthService)
  .config(config)
  .factory('Category', Category)
  .factory('CategoryProduct', CategoryProduct)
  .factory('Product', Product)
  .factory('Item', Item)
  .directive('topbar', TopbarDirective)
  .directive('fieldErrors', FieldErrorsDirective)
  .directive('hasError', HasErrorDirective)
  .controller('LoginCtrl', LoginController)
  .controller('RegisterCtrl', RegisterController)
  .controller('HomeCtrl', HomeController)
  .controller('CategoriesCtrl', CategoriesController)
  .controller('AddCategoryCtrl', AddCategoryController)
  .controller('EditCategoryCtrl', EditCategoryController)
  .controller('ProductsCtrl', ProductsController)
  .controller('AddProductCtrl', AddProductController)
  .controller('EditProductCtrl', EditProductController)
  .controller('ItemsCtrl', ItemsController)
  .controller('AddItemCtrl', AddItemController)
  .run(['$transitions', $transitions => {
    $transitions.onSuccess({}, trans => {
      if (trans.injector().get('JWTService').getAccessToken()) {
        trans.injector().get('AuthService').check()
      }
    })
  }])
