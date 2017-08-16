const YT_EVENT_PLAY = 1;

export default class MusicController {
  constructor(meta, $sce, $scope, discography, player, ngYoutubeEmbedService) {
    'ngInject';

    meta.setPageTitle('Musique');

    $scope.play = function(album, index) {
      player.start(discography.playlist(album), index);
    };

    $scope.audios = function() {
      return angular.element(document.querySelectorAll('audio'));
    };

    $scope.albums = discography.albums;

    function pauseYoutubePlayer() {
      ngYoutubeEmbedService.getPlayerById('myVideo').pauseVideo();
    }

    player.on('play', pauseYoutubePlayer);
    player.on('start', pauseYoutubePlayer);

    $scope.onYoutubePlayerStateChange = function(event) {
      if (event.data === YT_EVENT_PLAY) {
        player.pause();
      }
    };

    $scope.videoId = 'WP_c8cD6ZdQ';
  }
}
