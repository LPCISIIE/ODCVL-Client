
export default function FieldErrorsDirective () {
  return {
    restrict: 'AE',
    template: `
      <span class="help-block">
        <ul ng-if="!first && errors.length > 1">
          <li ng-repeat="error in errors">{{ error }}</li>
        </ul>
        <span ng-if="first || errors.length == 1">{{ errors[0] }}</span>
      </span>
    `,
    scope: {
      errors: '=',
      first: '='
    }
  }
}
