'use strict';

angular.module('iconsfall')
  .controller('NavbarCtrl', ['$scope', '$state', function ($scope) {
    $scope.state = {};
    $scope.$on('$stateChangeSuccess', function(e, toState) {
      $scope.state = {}
      $scope.state[toState.name] = toState;

      $('body').attr('data-state', toState.name);
    });
  }]);
