export default class MusicController {
  constructor($scope, $sce) {
    'ngInject';

    $scope.albums = [{
      title: 'White Line',
      cover: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/cover.jpg'),
      tracks: [
        {
          title: 'Golden Tree',
          ogg: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/01.%20Golden%20Tree.ogg'),
          mp3: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3'),
          webm: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/01.%20Golden%20Tree.webm')
        },
        {
          title: 'Paths',
          ogg: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/02.%20Paths.ogg'),
          mp3: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/02.%20Paths.mp3'),
          webm: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/02.%20Paths.webm')
        },
        {
          title: 'Season Passed',
          ogg: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/03.%20Season%20Passed.ogg'),
          mp3: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/03.%20Season%20Passed.mp3'),
          webm: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/03.%20Season%20Passed.webm')
        },
        {
          title: 'White Lane',
          ogg: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/04.%20White%20Line.ogg'),
          mp3: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/04.%20White%20Line.mp3'),
          webm: $sce.trustAsResourceUrl('http://files.iconsfall.com/music/white-line/04.%20White%20Line.webm')
        }
      ]
    }];
  }
}
