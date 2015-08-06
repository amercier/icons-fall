export default class NavbarDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        current: '='
      },
      controller: NavbarController,
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;
  }
}

class NavbarController {
  constructor ($scope, $state) {
    'ngInject';
    $scope.current = {};
    $scope.current[$state.current.name] = true;
  }
}
