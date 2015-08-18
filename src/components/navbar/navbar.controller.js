'use strict';

angular.module('iconsfall')
  .controller('NavbarController', ['$scope', '$state', function ($scope) {
    $scope.state = {};
    $scope.$on('$stateChangeSuccess', function(e, toState) {
      $scope.state = {};
      $scope.state[toState.name] = toState;
      angular.element(document.body).attr('data-state', toState.name);
    });
  }]);
