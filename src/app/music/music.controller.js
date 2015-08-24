export default class MusicController {
  constructor($sce, $scope, discography) {
    'ngInject';

    $scope.audios = function() {
      return angular.element(document.querySelectorAll('audio'));
    };

    $scope.albums = discography.albums;

    var started = false,
      playing = false,
      playTime;

    // Pause other audio on play
    $scope.onPlay = function(album, track, $event) {

      // Send GA event
      var trackName = album.title + ' / ' + track.title;
      if (!started) {
        started = true;
        ga('send', 'event', 'Music', 'Start', trackName);
      }
      else if (playing && playing.track !== track) {
        ga('send', 'event', 'Music', 'Switch From', playing.album.title + ' / ' + playing.track.title);
        ga('send', 'event', 'Music', 'Switch To', album.title + ' / ' + track.title);
      }

      playing = {
        album: album,
        track: track
      };
      playTime = Date.now();

      // Pause others
      angular.forEach($scope.audios(), function(audio) {
        if (audio !== $event.target) {
          audio.pause();
        }
      });
    };

    // Record time-to-play on playing
    $scope.onPlaying = function(album, track) {
      if (track === playing.track) {
        gat('Music', 'Playing', playTime, album.title + ' / ' + track.title);
      }
    };

    // Start preloading next 30 seconds before end
    $scope.onTimeUpdate = function(album, track, $event) {
      var next = angular.element($event.target.parentNode.parentNode).next('li').find('audio');
      if (next.length > 0 && $event.target.duration - $event.target.currentTime < 30) {
        next[0].preload = 'auto';
      }
    };

    // Change volume together
    $scope.onVolumeChange = function(album, track, $event) {
      var volume = $event.target.volume;
      angular.forEach($scope.audios(), function(audio) {
        if (audio !== $event.target) {
          audio.volume = volume;
        }
      });
    };

    // Track end
    $scope.onEnded = function(album, track, $event) {

      // Send 'Track Completed' GA event
      ga('send', 'event', 'Music', 'Track Completed', album.title + ' / ' + track.title);

      // Send 'Album Completed' GA event if last track
      if (track === album.tracks[album.tracks.length - 1]) {
        playing = false;
        started = false;
        ga('send', 'event', 'Music', 'Album Completed', album.title);
      }
      else {
        var next = angular.element($event.target.parentNode.parentNode).next('li').find('audio');
        next[0].play();
      }
    };
  }
}
