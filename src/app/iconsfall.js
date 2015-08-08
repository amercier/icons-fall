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
    var stateChangeStartTime;

    $rootScope.$on('$stateChangeStart', function() {
      stateChangeStartTime = Date.now();
    });

    $rootScope.$on('$stateChangeSuccess', function(e) {
      setTimeout(function() {
        $rootScope.$apply(function () {

          // Reflow Foundation
          $(document).foundation();

          // Track view on Google Analytics
          ga('send', 'pageview', { page: $location.path() });
          gat('Views', 'ChangeSuccess', stateChangeStartTime, $location.path());
        });
      }, 0);
    });

    $rootScope.$on('$viewContentLoading', function(e) {
      gat('Views', 'ContentLoading', stateChangeStartTime, $location.path());
    });

    $rootScope.$on('$viewContentLoaded', function(e) {
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

// jQuery errors
jQuery.error = function (message) {
  ga('send', 'event', 'jQuery Error', message, navigator.userAgent, 0, true);
}

// jQuery AJAX errors handler (jQuery API)
$(document).ajaxError(function (event, request, settings) {
  ga('send', 'event', 'jQuery Ajax Error', settings.url, JSON.stringify({
    result: event.result,
    status: request.status,
    statusText: request.statusText,
    crossDomain: settings.crossDomain,
    dataType: settings.dataType
  }), 0, true);
});
