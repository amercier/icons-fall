'use strict';

angular.module('iconsfall')
  .controller('AboutCtrl', function ($rootScope, MetaService) {
    $rootScope.meta = MetaService;
    $rootScope.meta.setPageTitle('Bio');
  });
