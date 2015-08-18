'use strict';

angular.module('iconsfall')
  .controller('HomeController', function ($rootScope, MetaService) {
    $rootScope.meta = MetaService;
    $rootScope.meta.setPageTitle(false);
  });
