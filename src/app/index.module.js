import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import HomeController from './home/home.controller';
import AboutController from './about/about.controller';
import DiscographyService from './music/discography.service';
import MusicController from './music/music.controller';
import CalendarController from './calendar/calendar.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';

import AudioService from '../app/components/player/audio.service';
import PlayerService from '../app/components/player/player.service';
import FormatDurationFilter from '../app/components/player/duration.filter';
import PlayerController from '../app/components/player/player.controller';

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
  .factory('discography', $sce => new DiscographyService($sce))
  .controller('MusicController', MusicController)
  .controller('CalendarController', CalendarController)
  .directive('iconsfallNavbar', () => new NavbarDirective())

  .factory('audio', $document => new AudioService($document).element)
  .factory('player', ($rootScope, audio) => new PlayerService($rootScope, audio))
  .filter('formatDuration', () => new FormatDurationFilter().filter)
  .controller('PlayerController', ($scope, discography, player) => new PlayerController($scope, discography, player));

var app = angular.module('iconsfall');

app.directive('playerView', [function(){

  return {
    restrict: 'EA',
    require: ['^ngModel'],
    scope: {
      ngModel: '='
    },
    templateUrl: 'app/components/player/player.html',
    link: function(scope) {

      scope.$watchCollection('ngModel', function(ngModel) {
        scope.started = !!ngModel.current;
        scope.track = ngModel.current;
        scope.duration = ngModel.duration;
        scope.currentTime = ngModel.currentTime;
        scope.currentTimePercent = 100 * ngModel.currentTime / ngModel.duration;
        scope.playing = ngModel.playing;
        scope.ended = ngModel.ended;
        scope.ready = ngModel.ready;
      });

      scope.playPause = function() {
        scope.ngModel.playPause();
      };

      scope.replay = function() {
        scope.ngModel.playing = true;
        scope.ngModel.setTrack(0);
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
