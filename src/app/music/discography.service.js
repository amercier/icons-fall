export default class DiscographyService {
  constructor($sce) {
    'ngInject';

    this.albums = [{
      title: 'White Line',
      type: 'EP',
      cover: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/cover.jpg'),
      tracks: [
        {
          track: '01',
          title: 'Golden Tree',
          sources: [
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3'), type: 'audio/mp3' }
          ]
        },
        {
          track: '02',
          title: 'Season Passed',
          sources: [
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.mp3'), type: 'audio/mp3' }
          ]
        },
        {
          track: '03',
          title: 'Paths',
          sources: [
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/03.%20Paths.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/03.%20Paths.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/03.%20Paths.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/03.%20Paths.mp3'), type: 'audio/mp3' }
          ]
        },
        {
          track: '04',
          title: 'White Line',
          sources: [
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/04.%20White%20Line.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/04.%20White%20Line.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/04.%20White%20Line.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('//cdn.iconsfall.com/music/white-line/04.%20White%20Line.mp3'), type: 'audio/mp3' }
          ]
        }
      ]
    }];
  }

  playlist(album) {
    return album.tracks.map(function(track) {
      return {
        track: track.track,
        title: track.title,
        sources: track.sources,
        album: album,
        toString: function() {
          return [album.title, track.title].join(' / ');
        }
      };
    });
  }
}
