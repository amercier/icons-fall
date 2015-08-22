'use strict';

angular.module('iconsfall')
  .controller('PlayerController', function ($rootScope, $sce, $timeout) {

    // TODO: make it an Angular Service
    $rootScope.albums = [{
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

    var player = this,
      album = $rootScope.albums[0];

    player.state = null;
    player.API = null;
    player.currentAlbum = album;
    player.currentTrackIndex = 0;
    player.currentTrack = album.tracks[player.currentTrackIndex];

    player.onPlayerReady = function(API) {
      player.API = API;
    };

    player.onTrackComplete = function() {
      player.isCompleted = true;
      player.currentTrackIndex++;
      if (player.currentTrackIndex >= player.currentAlbum.length) {
        player.currentTrackIndex = 0;
        player.replay = true;
        return;
      }
      player.currentTrack = album.tracks[player.currentTrackIndex];
      player.setTrack(player.currentTrackIndex);
    };

    player.tracks = album.tracks.map(function(track) {
      return {
        sources: [
          { src: track.ogg, type: 'audio/ogg; codecs="vorbis"'},
          { src: track.webm, type: 'audio/webm; codecs="vorbis"'},
          { src: track.m4a, type: 'audio/mp4'},
          { src: track.mp3, type: 'audio/mp3'}
        ]
      };
    });
    console.log('tracks', player.tracks);

    player.config = {
      preload: 'none',
      autoHide: false,
      autoHideTime: 3000,
      autoPlay: false,
      sources: player.tracks[0].sources,
      theme: {
        url: 'http://www.videogular.com/styles/themes/default/latest/videogular.css'
      }
    };

    player.play = function() {
      $timeout(player.API.play.bind(player.API), 100);
    };

    player.setTrack = function(index) {
      player.API.stop();
      player.config.sources = player.tracks[index].sources;
      player.play();
    };
  });
