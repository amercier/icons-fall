'use strict';

angular.module('iconsfall')
  .controller('HomeCtrl', function ($rootScope, MetaService) {
    $rootScope.meta = MetaService;
    $rootScope.meta.setPageTitle(false);
  });
