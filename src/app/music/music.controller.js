'use strict';

angular.module('iconsfall')
  .controller('MusicCtrl', ['$scope', '$sce', function ($scope, $sce) {

    $scope.albums = [{
      title: 'White Line',
      cover: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/cover.jpg'),
      tracks: [
        {
          title: 'Golden Tree',
          url: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3')
        },
        {
          title: 'Season Passed',
          url: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/03.%20Season%20Passed.mp3')
        },
        {
          title: 'Paths',
          url: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/02.%20Paths.mp3')
        },
        {
          title: 'White Line',
          url: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/04.%20White%20Line.mp3')
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

    $.createEventCapturing(['play', 'playing', 'ended', 'volumechange']);

    var started = false,
      playing = false;

    // Pause other audio on play
    $(document).on('play', 'audio', function(event) {

      // Send GA event
      var target = $(event.target),
        track = [ target.data('album'), target.data('track'), target.data('title') ].join(' / ');
      if (!started) {
        started = true;
        ga('send', 'event', 'Music', 'Start', track);
      }
      else if (playing) {
        ga('send', 'event', 'Music', 'Switch', playing + ' to ' + track);
      }
      playing = track;

      // Pause others
      $('audio').not(event.target).each(function() {
        this.pause();
      });
    });

    $(document).on('pause', 'audio', function(event) {
      playing = false;
    });

    // Set volume to all together
    $(document).on('volumechange', 'audio', function(event) {
      $('audio').not(event.target).each(function() {
        this.muted = event.target.muted;
        this.volume = event.target.volume;
      });
    });

    $(document).on('ended', 'audio', function(event) {

      // Send GA event
      var target = $(event.target),
        next = target.parents('li').first().next('li').find('audio');
      if (next) {
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
