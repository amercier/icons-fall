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

app.filter('formatDuration', function() {
  return function(duration) {
    duration = Math.round(duration);
    const seconds = duration % 60,
      minutes = (duration - seconds) / 60;
    return [
      (minutes < 10 ? '0' : '') + minutes,
      (seconds < 10 ? '0' : '') + seconds
    ].join(':');
  };
});

app.factory('audio', function($document) {
  var audio = $document[0].createElement('audio');
  return audio;
});

app.factory('player', function(audio, $rootScope) {
  var player = {

    current: null,
    currentTime: 0,
    playing: false,
    ready: false,
    ended: false,
    playlist: [],

    setTrack: function(index) {
      player.current = player.playlist[index];
      player.currentIndex = index;
      audio.src = player.playlist[index].sources[0].src;
      if (player.playing) {
        audio.play();
      }
    },

    start: function(playlist, index = 0) {
      if (player.playing) {
        player.stop();
      }

      player.playlist = playlist;
      player.playing = true;
      player.ended = false;
      player.setTrack(index);
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
        player.playlist = [];
      }
    },

    next: function() {
      if (player.currentIndex < player.playlist.length - 1) {
        player.setTrack(player.currentIndex + 1);
      }
    },

    previous: function() {
      if (player.currentIndex > 0) {
        player.setTrack(player.currentIndex - 1);
      }
    },

    setProgress: function(progress) {
      progress = Math.max(0, progress);
      progress = Math.min(1, progress);
      audio.currentTime = audio.duration * progress;
    }
  };

  audio.addEventListener('canplay', function() {
    $rootScope.$apply(function() {
      player.ready = true;
    });
  });

  audio.addEventListener('timeupdate', function() {
    $rootScope.$apply(function() {
      player.currentTime = audio.currentTime;
    });
  });

  audio.addEventListener('loadedmetadata', function() {
    $rootScope.$apply(function() {
      player.duration = audio.duration;
    });
  });

  audio.addEventListener('ended', function() {
    $rootScope.$apply(function() {
      if (player.playlist.length > 1) {
        player.next();
      }
      else {
        player.ended = true;
        player.stop();
      }
    });
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
          scope.started = true;
          scope.track = scope.ngModel.current;
        }
      });

      scope.$watch('ngModel.duration', function() {
        scope.duration = scope.ngModel.duration;
      });

      scope.$watch('ngModel.currentTime', function() {
        scope.currentTime = scope.ngModel.currentTime;
        scope.currentTimePercent = 100 * scope.ngModel.currentTime / scope.ngModel.duration;
      });

      scope.$watch('ngModel.playing', function() {
        scope.playing = scope.ngModel.playing;
      });

      scope.$watch('ngModel.ready', function() {
        scope.ready = scope.ngModel.ready;
      });

      scope.playPause = function() {
        scope.ngModel.playPause();
        scope.playing = !scope.playing;
      };

      scope.next = function() {
        scope.ngModel.next();
      };

      scope.previous = function() {
        scope.ngModel.previous();
      };

      scope.hasPrevious = function() {
        return scope.ngModel.playlist.length > 1 &&
          scope.ngModel.currentIndex > 0;
      };

      scope.hasNext = function() {
        return scope.ngModel.playlist.length > 1 &&
          scope.ngModel.currentIndex < scope.ngModel.playlist.length - 1;
      };

      scope.onProgressClick = function($event) {
        scope.ngModel.setProgress($event.clientX / $event.currentTarget.clientWidth);
      };
    }
  };
}]);

app.controller('PlayerController', function($scope, discography, player) {
  $scope.player = player;
  $scope.albums = discography.albums;
});
