'use strict';

angular.module('iconsFall', ['ngAnimate', 'ngTouch', 'ngResource', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
