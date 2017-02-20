
export default function FormErrorsDirective () {
  return {
    restrict: 'AE',
    template: `
      <span class="help-block">
        <ul ng-if="errors.length > 1">
          <li ng-repeat="error in errors">{{ error }}</li>
        </ul>
        <span ng-if="errors.length == 1">{{ errors[0] }}</span>
      </span>
    `,
    scope: {
      errors: '='
    }
  }
}
