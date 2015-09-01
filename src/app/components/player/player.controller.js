export default class PlayerController {
  constructor($scope, discography, player) {
    'ngInject';

    $scope.player = player;
    $scope.albums = discography.albums;
  }
}
