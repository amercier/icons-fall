'use strict';

angular
  .module('iconsfall', [
    'ngAnimate',
    'ngTouch',
    'ngResource',
    'ui.router',
    'angular-timeline',
    'mm.foundation',
    'ngMedia',
    'duScroll'
  ])
  .service('MetaService', function() {
    var pageTitle,
      appTitle = document.title,
      separator = '-';

    return {
      setPageTitle: function(newPageTitle) {
        console.info('setPageTitle', newPageTitle);
        pageTitle = newPageTitle;
      },
      title: function() {
        return pageTitle ? [pageTitle, separator, appTitle].join(' ') : appTitle;
      }
    };
  })
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
  .run(function($rootScope, $location, MetaService) {
    var stateChangeStartTime;

    $rootScope.$on('$stateChangeStart', function(event) {
      stateChangeStartTime = Date.now();
    });

    $rootScope.$on('$stateChangeSuccess', function() {
      setTimeout(function() {
        $rootScope.$apply(function () {

          // Update title
          document.title = MetaService.title();

          // Track view on Google Analytics
          ga('send', 'pageview', { page: $location.path() });
          gat('Views', 'ChangeSuccess', stateChangeStartTime, $location.path());
        });
      }, 0);
    });

    $rootScope.$on('$viewContentLoaded', function() {
      if (stateChangeStartTime) { // else: no change start
        gat('Views', 'ContentLoaded', stateChangeStartTime, $location.path());
      }
    });
  });

// Error handling
// --------------

// JavaScript errors
window.addEventListener('error', function (err) {
  var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + err.lineno;
  ga('send', 'event', 'JavaScript Error', err.message, err.filename + lineAndColumnInfo + ' -> ' +  navigator.userAgent, 0, true);
});

// AngularJS exceptions handler
angular.module('iconsfall')
  .config(function ($provide) {
    $provide.decorator("$exceptionHandler", function ($delegate) {
      return function (exception, cause) {
        $delegate(exception, cause);
        ga('send', 'event', 'AngularJS error', exception.message, exception.stack, 0, true);
      };
    });
  });
