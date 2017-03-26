import 'angular-ui-grid/ui-grid.min.css'
import './assets/scss/app.scss'

import angular from 'angular'
import resource from 'angular-resource'
import router from 'angular-ui-router'
import uiBootstrap from 'angular-ui-bootstrap'
import uiGrid from 'angular-ui-grid'
import uiSelect from 'ui-select'
import ngSanitize from 'angular-sanitize'

import config from './config'
import JWTService from './app/authentication/jwt.service'
import AuthService from './app/authentication/authentication.service'
import FlashService from './app/authentication/flash.service'
import BarcodeService from './app/item/barcode.service'

import User from './app/user/user'
import Category from './app/category/category'
import CategoryProduct from './app/category/category.product'
import LocationItem from './app/location/location.items'
import Product from './app/product/product'
import Item from './app/item/item'
import Client from './app/client/client'
import Location from './app/location/location'

import TopbarDirective from './app/topbar/topbar.directive'
import FieldErrorsDirective from './app/common/field-errors.directive'
import HasErrorDirective from './app/common/has-error.directive'
import datepickerPopupDirective from './app/common/datepickerPopupDirective'
import BarcodeScannerDirective from './app/location/barcodeScanner'

import LoginController from './app/authentication/login.controller'
import RegisterController from './app/authentication/register.controller'
import HomeController from './app/home/home.controller'
import CategoriesController from './app/category/categories.controller'
import AddCategoryController from './app/category/categories.add.controller'
import EditCategoryController from './app/category/categories.edit.controller'
import ClientsController from './app/client/clients.controller'
import AddClientController from './app/client/clients.add.controller'
import EditClientController from './app/client/clients.edit.controller'
import ProductsController from './app/product/products.controller'
import EditStockController from './app/stock/stock.edit.controller'
import AddProductController from './app/product/products.add.controller'
import EditProductController from './app/product/products.edit.controller'
import ItemsController from './app/item/items.controller'
import AddItemController from './app/item/items.add.controller'
import EditItemController from './app/item/items.edit.controller'
import LocationController from './app/location/locations.controller'
import AddLocationController from './app/location/locations.add.controller'
import EditLocationController from './app/location/locations.edit.controller'
import EditFicheLocationController from './app/location/location.fiche.controller'
import ModalController from './app/location/modal.controller'

export default angular.module('app', [resource, router, uiBootstrap, uiGrid, uiSelect, ngSanitize])
  .constant('API', {
    url: 'http://localhost/ODCVL/public'
  })
  .factory('User', User)
  .service('JWTService', JWTService)
  .service('FlashService', FlashService)
  .service('AuthService', AuthService)
  .service('BarcodeService', BarcodeService)
  .config(config)
  .factory('Category', Category)
  .factory('CategoryProduct', CategoryProduct)
  .factory('LocationItem', LocationItem)
  .factory('Product', Product)
  .factory('Item', Item)
  .factory('Client', Client)
  .factory('Location', Location)
  .directive('topbar', TopbarDirective)
  .directive('fieldErrors', FieldErrorsDirective)
  .directive('hasError', HasErrorDirective)
  .directive('barcodeScanner', BarcodeScannerDirective)
  .directive('datepickerPopup', datepickerPopupDirective)
  .controller('LoginCtrl', LoginController)
  .controller('RegisterCtrl', RegisterController)
  .controller('HomeCtrl', HomeController)
  .controller('CategoriesCtrl', CategoriesController)
  .controller('AddCategoryCtrl', AddCategoryController)
  .controller('EditCategoryCtrl', EditCategoryController)
  .controller('ClientsCtrl', ClientsController)
  .controller('AddClientCtrl', AddClientController)
  .controller('EditClientCtrl', EditClientController)
  .controller('ProductsCtrl', ProductsController)
  .controller('AddProductCtrl', AddProductController)
  .controller('EditProductCtrl', EditProductController)
  .controller('EditStockCtrl', EditStockController)
  .controller('ItemsCtrl', ItemsController)
  .controller('AddItemCtrl', AddItemController)
  .controller('EditItemCtrl', EditItemController)
  .controller('LocationController', LocationController)
  .controller('AddLocationController', AddLocationController)
  .controller('EditLocationCtrl', EditLocationController)
  .controller('EditFicheLocationCtrl', EditFicheLocationController)
  .controller('ModalController', ModalController)
  .run(['$transitions', $transitions => {
    $transitions.onSuccess({}, trans => {
      if (trans.injector().get('JWTService').getAccessToken()) {
        trans.injector().get('AuthService').check()
      }
    })
  }])
