'use strict';

angular.module('iconsfall')
  .controller('NewsletterController', function ($scope, $http) {

    $scope.email = '';
    $scope.loading = false;
    $scope.done = false;
    $scope.error = null;

    $scope.onSubmit = function() {
      $scope.error = null;
      $scope.loading = true;
      console.log($scope.email);

      $http.post('https://my.sendinblue.com/users/subscribe/js_id/25utl/id/1', {
        from_url: 'yes',
        listid: '4',
        email: $scope.email
      }).then(function() {
        $scope.done = true;
        $scope.loading = false;
      }, function(response) {
        $scope.error = true;
        $scope.loading = false;
      });
    };
  });
