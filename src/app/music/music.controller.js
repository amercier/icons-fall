'use strict';

angular.module('iconsfall')
  .controller('MusicController', function($rootScope, MetaService, $sce, $scope, $element) {
    $rootScope.meta = MetaService;
    $rootScope.meta.setPageTitle('Musique');

    $scope.audios = function() {
      return angular.element($element[0].querySelectorAll('audio'));
    };

    $scope.albums = [{
      title: 'White Line',
      type: 'EP',
      cover: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/cover.jpg'),
      tracks: [
        {
          track: '01',
          title: 'Golden Tree',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.webm'),
          m4a: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.m4a')
        },
        {
          track: '02',
          title: 'Season Passed',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.webm'),
          m4a: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.m4a')
        },
        {
          track: '03',
          title: 'Paths',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.webm'),
          m4a: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.m4a')
        },
        {
          track: '04',
          title: 'White Line',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.webm'),
          m4a: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.m4a')
        }
      ]
    }];

    var started = false,
      playing = false;

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

      // Pause others
      angular.forEach($scope.audios(), function(audio) {
        if (audio !== $event.target) {
          audio.pause();
        }
      });
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
  });
