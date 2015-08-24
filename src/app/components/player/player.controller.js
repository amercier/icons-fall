export default class PlayerController {
  constructor($scope, discographyService, player) {
    'ngInject';

    $scope.player = player;
    $scope.tracks = discographyService.tracks(discographyService.albums[0]);
  }
}
