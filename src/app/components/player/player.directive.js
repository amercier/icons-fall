export default class PlayerDirective {
  constructor() {
    'ngInject';

    return {
      restrict: 'EA',
      templateUrl: 'app/components/player/player.html',
      scope: {
        ngModel: '='
      },
      require: ['^ngModel'],
      link: (scope) => new PlayerDirectiveController(scope)
    };
  }
}

class PlayerDirectiveController {
  constructor(scope) {
    'ngInject';

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
}
