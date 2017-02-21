import './assets/app.scss'

import angular from 'angular'
import resource from 'angular-resource'
import router from 'angular-ui-router'

import config from './config'
import JWTService from './app/authentication/jwt.service'
import AuthService from './app/authentication/authentication.service'

import User from './app/user/user'
import Category from './app/category/category'
import Product from './app/product/product'

import TopbarDirective from './app/topbar/topbar.directive'
import FormErrorsDirective from './app/form-errors.directive'

import LoginController from './app/authentication/login.controller'
import RegisterController from './app/authentication/register.controller'
import HomeController from './app/home/home.controller'
import CategoriesController from './app/category/categories.controller'
import AddCategoryController from './app/category/categories.add.controller'
import EditCategoryController from './app/category/categories.edit.controller'
import ProductsController from './app/product/products.controller'
import AddProductController from './app/product/products.add.controller'
import EditProductController from './app/product/products.edit.controller'

export default angular.module('app', [resource, router])
  .constant('API', {
    url: 'http://localhost/private/ODCVL/public'
  })
  .factory('User', User)
  .service('JWTService', JWTService)
  .service('AuthService', AuthService)
  .config(config)
  .factory('Category', Category)
  .factory('Product', Product)
  .directive('topbar', TopbarDirective)
  .directive('formErrors', FormErrorsDirective)
  .controller('LoginCtrl', LoginController)
  .controller('RegisterCtrl', RegisterController)
  .controller('HomeCtrl', HomeController)
  .controller('CategoriesCtrl', CategoriesController)
  .controller('AddCategoryCtrl', AddCategoryController)
  .controller('EditCategoryCtrl', EditCategoryController)
  .controller('ProductsCtrl', ProductsController)
  .controller('AddProductCtrl', AddProductController)
  .controller('EditProductCtrl', EditProductController)
