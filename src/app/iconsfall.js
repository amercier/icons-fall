'use strict';

angular.module('iconsfall', ['ngAnimate', 'ngTouch', 'ngResource', 'ui.router', 'angular-timeline', 'rt.encodeuri'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('music', {
        url: '/music',
        templateUrl: 'app/music/music.html',
        controller: 'MusicCtrl'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .run(function($rootScope) {
    $rootScope.$on(
      '$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        setTimeout(function() {
          $rootScope.$apply(function () {
            $(document).foundation()
          });
        }, 0);
      }
    );
  });
