
export default function PaginationDirective () {
  return {
    restrict: 'AE',
    template: require('./pagination.html'),
    scope: {
      pages: '=',
      page: '=',
      url: '='
    },
    link: (scope, element, attrs) => {
      scope.getPages = (pages) => {
        return new Array(pages)
      }
    }
  }
}
