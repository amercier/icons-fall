'use strict';

angular.module('iconsfall')
  .controller('CalendarCtrl', ['$scope', '$q', '$http', function ($scope, $q, $http) {

    var environment = {
            'iconsfall.com': 'production',
            'staging.iconsfall.com': 'staging'
          }[location.host] || 'development',

        now = new Date(),
        today = new Date(),
        afterTime = new Date((new Date()).getTime() - 24 * 3600 * 1000),

        apiKey = {
            development: 'AIzaSyArUI5x5gVBaJveN2e-LSHrjb3cNqZdxtE',
            staging: 'AIzaSyDkLZm2YY4DOXgHBXAEYcx9xeb1LDuuQo0',
            production: 'AIzaSyBKWXYfrcvF6-24FMJqI0OCCDA4LrQB1yY'
          }[environment],

        calendars = {
            development: {
              'l8b30g066blbal91sc0lnothp8@group.calendar.google.com': 'concert',
              'qqj7m66f1320ieih44plda7hl0@group.calendar.google.com': 'recording',
              'naauslsv7q1k5rc57ltr7bkgac@group.calendar.google.com': 'residence'
            },
            staging: {
              'l8b30g066blbal91sc0lnothp8@group.calendar.google.com': 'concert',
              'qqj7m66f1320ieih44plda7hl0@group.calendar.google.com': 'recording',
              'naauslsv7q1k5rc57ltr7bkgac@group.calendar.google.com': 'residence'
            },
            production: {
              'uhh2f7e4311su1hkal0vbv4ag0@group.calendar.google.com': 'concert',
              '0rtnac07pej1tp8hsdh4n4deq0@group.calendar.google.com': 'recording',
              'psj8q1be7fun4mdfkggg49n5e0@group.calendar.google.com': 'residence'
            }
          }[environment];
    today.setHours(0, 0, 0, 0);

    $scope.events = [];

    $q.all(Object.keys(calendars).map(function(calendarId) {
        return $http.get(
          'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events',
          {
            params: {
              key: apiKey,
              timeMin: afterTime
            }
          }
        );
      }))
      .then(
        function(data) {
          $scope.events = [].concat.apply([], data.map(function(calendar) {
              return calendar.data.items.map(function(item) {
                item.type = calendars[item.organizer.email];
                if (item.start.dateTime) {
                  item.date = new Date(item.start.dateTime);
                  item.done = new Date(item.end.dateTime) < now.getTime();
                }
                else if (item.start.date) {
                  var d = item.start.date.split('-');
                  item.date = new Date(d[0], d[1], d[2]);
                  item.done = item.date.getTime() < today.getTime();
                }
                else {
                  item.date = new Date();
                  item.done = false;
                }
                return item;
              });
            }))
            .sort(function(a, b) {
              return a.date.getTime() - b.date.getTime();
            })
            .map(function(item) {
              console.log(item);
              return item;
            });
        },
        function(error) {
          console.error('ERROR', error);
        }
      );

  }]);
