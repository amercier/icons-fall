export default class NavbarDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {},
      controller: NavbarController,
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;
  }
}

class NavbarController {
  constructor ($scope, $rootScope, $route) {
    'ngInject';

    $rootScope.$on('$routeChangeSuccess', () => {
      $scope.current = {};
      if ($route.current) {
        $scope.current[$route.current.$$route.id] = true;
      }
    });
  }
}
