import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import HomeController from './home/home.controller';
import AboutController from './about/about.controller';
import DiscographyService from './music/discography.service';
import MusicController from './music/music.controller';
import CalendarController from './calendar/calendar.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';

angular.module('iconsfall', [
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'ngMedia',
  'mm.foundation',
  'rt.encodeuri',
  'angular-timeline',
  'duScroll'
])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('HomeController', HomeController)
  .controller('AboutController', AboutController)
  .factory('discography', ($sce) => new DiscographyService($sce))
  .controller('MusicController', MusicController)
  .controller('CalendarController', CalendarController)
  .directive('iconsfallNavbar', () => new NavbarDirective());

var app = angular.module('iconsfall');

app.factory('audio', function($document) {
  var audio = $document[0].createElement('audio');
  return audio;
});

app.factory('player', function(audio, $rootScope) {
  var player = {

    current: null,
    progress: 0,
    playing: false,
    ready: false,

    start: function(playlist, index = 0) {
      if (player.playing) {
        player.stop();
      }

      player.playlist = playlist;

      var url = playlist[index].sources[0].src;
      player.current = playlist[index];
      player.currentIndex = index;
      audio.src = url;
      audio.play();
      player.playing = true;
    },

    playPause: function() {
      if (player.playing) {
        player.playing = false;
        audio.pause();
      }
      else {
        player.playing = true;
        audio.play();
      }
    },

    stop: function() {
      if (player.playing) {
        audio.pause();
        player.playing = false;
        player.current = null;
      }
    },

    currentTime: function() {
      return audio.currentTime;
    },

    next: function() {
      if (player.currentIndex < player.playlist.length - 1) {
        player.start(player.playlist, player.currentIndex + 1);
      }
    },

    previous: function() {
      if (player.currentIndex > 0) {
        player.start(player.playlist, player.currentIndex - 1);
      }
    },

    currentDuration: function() {
      return audio.duration;
    }
  };

  audio.addEventListener('canplay', function() {
    $rootScope.$apply(function() {
      player.ready = true;
    });
  });

  audio.addEventListener('timeupdate', function() {
    $rootScope.$apply(function() {
      player.progress = player.currentTime();
      player.percentage = 100 * player.progress / player.currentDuration();
    });
  });

  audio.addEventListener('ended', function() {
    if (player.playlist.length > 1) {
      $rootScope.$apply(player.next());
    }
    else {
      $rootScope.$apply(player.stop());
    }
  });

  return player;
});

app.directive('playerView', [function(){

  return {
    restrict: 'EA',
    require: ['^ngModel'],
    scope: {
      ngModel: '='
    },
    templateUrl: 'app/components/player/player.html',
    link: function(scope) {

      scope.$watch('ngModel.current', function(newVal) {
        if (newVal) {
          scope.playing = true;
          scope.track = scope.ngModel.current;

          scope.$watch('ngModel.ready', function(newVal) {
            if (newVal) {
              scope.duration = scope.ngModel.currentDuration();
            }
          });

          scope.$watch('ngModel.progress', function() {
            scope.secondsProgress = scope.ngModel.progress;
            scope.percentComplete = scope.ngModel.percentage;
          });
        }
      });

      scope.playPause = function() {
        scope.ngModel.playPause();
      };

      scope.next = function() {
        scope.ngModel.next();
      };

      scope.previous = function() {
        scope.ngModel.previous();
      };

      scope.hasPrevious = function() {
        scope.ngModel.hasPrevious();
      };

      scope.hasNext = function() {
        scope.ngModel.hasNext();
      };
    }
  };
}]);

app.controller('PlayerController', function($scope, discography, player) {
  $scope.player = player;
  $scope.albums = discography.albums;
});
