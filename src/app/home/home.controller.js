'use strict';

angular.module('iconsfall')
  .controller('HomeCtrl', function ($scope, $http) {
    $http.get('/assets/images/iconsfall-logo.svg')
      .then(function(data) {
        $('.home-logo').append($(data.data).get(2));
      });
  });
