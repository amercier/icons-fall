'use strict';

angular.module('iconsfall')
  .controller('MusicCtrl', ['$scope', '$sce', function ($scope, $sce) {

    $scope.albums = [{
      title: 'White Line',
      type: 'EP',
      cover: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/cover.jpg'),
      tracks: [
        {
          title: 'Golden Tree',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.webm')
        },
        {
          title: 'Season Passed',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.webm')
        },
        {
          title: 'Paths',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.webm')
        },
        {
          title: 'White Line',
          ogg: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.ogg'),
          mp3: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.mp3'),
          webm: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.webm')
        }
      ]
    }];

    $.createEventCapturing = (function () {
      var special = $.event.special;
      return function (names) {
        if (!document.addEventListener) {
          return;
        }
        if (typeof names === 'string') {
          names = [names];
        }
        $.each(names, function (i, name) {
          var handler = function (e) {
            e = $.event.fix(e);
            return $.event.dispatch.call(this, e);
          };
          special[name] = special[name] || {};
          if (special[name].setup || special[name].teardown) {
            return;
          }
          $.extend(special[name], {
            setup: function () {
              this.addEventListener(name, handler, true);
            },
            teardown: function () {
              this.removeEventListener(name, handler, true);
            }
          });
        });
      };
    })();

    $.createEventCapturing(['play', 'timeupdate', 'ended', 'volumechange']);

    var started = false,
      playing = false;

    // Pause other audio on play
    $(document).off('play').on('play', 'audio', function(event) {

      // Send GA event
      var target = $(event.target),
        track = [ target.data('album'), target.data('track'), target.data('title') ].join(' / ');
      if (!started) {
        started = true;
        ga('send', 'event', 'Music', 'Start', track);
      }
      else if (playing && playing !== track) {
        ga('send', 'event', 'Music', 'Switch', playing + ' to ' + track);
      }
      playing = track;

      // Pause others
      $('audio').not(event.target).each(function() {
        this.pause();
      });
    });

    $(document).off('pause').on('pause', 'audio', function(event) {
      playing = false;
    });

    // Start preloading next
    $(document).off('timeupdate').on('timeupdate', 'audio', function(event) {
      var target = $(event.target),
        next = target.parents('li').first().next('li').find('audio');
      if (next.length > 0 && event.target.duration - event.target.currentTime < 30) {
        next.get(0).preload = 'auto';
      }
    });

    // Set volume to all together
    $(document).off('volumechange').on('volumechange', 'audio', function(event) {
      $('audio').not(event.target).each(function() {
        this.muted = event.target.muted;
        this.volume = event.target.volume;
      });
    });

    $(document).off('ended').on('ended', 'audio', function(event) {

      // Send GA event
      var target = $(event.target),
        next = target.parents('li').first().next('li').find('audio');
      if (next.length > 0) {
        var track = [ next.data('album'), next.data('track'), next.data('title') ].join(' / ');
        ga('send', 'event', 'Music', 'Next', track);

        next.get(0).play();
      }
      else {
        var track = [ target.data('album'), target.data('track'), target.data('title') ].join(' / ');
        playing = false;
        started = false;
        ga('send', 'event', 'Music', 'Ended', track);
      }
    });
  }]);
