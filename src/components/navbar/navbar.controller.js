'use strict';

angular.module('iconsfall')
  .controller('NavbarController', function ($rootScope) {
    $rootScope.state = {};
    $rootScope.$on('$stateChangeSuccess', function(e, toState) {
      $rootScope.state = {};
      $rootScope.state[toState.name] = toState;
      angular.element(document.body).attr('data-state', toState.name);
    });
  });
