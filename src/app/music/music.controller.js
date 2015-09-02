export default class MusicController {
  constructor(meta, $sce, $scope, discography, player) {
    'ngInject';

    meta.setPageTitle('Musique');

    $scope.play = function(album, index) {
      player.start(discography.playlist(album), index);
    };

    $scope.audios = function() {
      return angular.element(document.querySelectorAll('audio'));
    };

    $scope.albums = discography.albums;
  }
}
