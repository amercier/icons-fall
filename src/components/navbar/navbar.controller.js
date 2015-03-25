'use strict';

angular.module('iconsfall')
  .controller('NavbarCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope[$state.current.name] = $state.current;
  }]);
