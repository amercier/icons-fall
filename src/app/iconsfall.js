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
  .run(function($rootScope, $location) {
    $rootScope.$on('$stateChangeSuccess', function() {
      setTimeout(function() {
        $rootScope.$apply(function () {

          // Reflow Foundation
          $(document).foundation();

          // Track view on Google Analytics
          if (window.ga) {
            ga('send', 'pageview', { page: $location.path() });
          }
        });
      }, 0);
    });
  });
