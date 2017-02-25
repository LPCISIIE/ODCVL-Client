
export default function HasErrorDirective () {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      scope.$watch(attrs.hasError, (value) => {
        if (value) {
          element.addClass('has-error')
        }
      })
    }
  }
}
