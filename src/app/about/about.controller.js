'use strict';

angular.module('iconsfall')
  .controller('AboutController', function ($rootScope, MetaService) {
    $rootScope.meta = MetaService;
    $rootScope.meta.setPageTitle('Bio');
  });
