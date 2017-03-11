
export default function datepickerPopupDirective () {
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function (scope, element, attr, controller) {
      controller.$formatters.shift()
    }
  }
}
