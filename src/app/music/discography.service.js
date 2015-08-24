export default class DiscographyService {
  constructor($sce) {
    'ngInject';

    this.albums = [{
      title: 'White Line',
      type: 'EP',
      cover: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/cover.jpg'),
      tracks: [
        {
          track: '01',
          title: 'Golden Tree',
          sources: [
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/01.%20Golden%20Tree.mp3'), type: 'audio/mp3' }
          ]
        },
        {
          track: '02',
          title: 'Season Passed',
          sources: [
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/02.%20Season%20Passed.mp3'), type: 'audio/mp3' }
          ]
        },
        {
          track: '03',
          title: 'Paths',
          sources: [
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/03.%20Paths.mp3'), type: 'audio/mp3' }
          ]
        },
        {
          track: '04',
          title: 'White Line',
          sources: [
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.ogg'), type: 'audio/ogg; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.webm'), type: 'audio/webm; codecs="vorbis"' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.m4a'), type: 'audio/mp4' },
            { src: $sce.trustAsResourceUrl('http://cdn.iconsfall.com/music/white-line/04.%20White%20Line.mp3'), type: 'audio/mp3' }
          ]
        }
      ]
    }];
  }

  tracksBefore(album, index) {
    return index === 0 ? [] : Array.apply(null, Array(index)).map((nil, i) => {
      return album.tracks[i];
    });
  }

  tracksAfter(album, index) {
    return index >= album.tracks.length ? [] : Array.apply(null, Array(album.tracks.length - index - 1)).map((nil, i) => {
      return album.tracks[index + i + 1];
    });
  }

  playlist(album, index, loop = false) {
    return [album.tracks[index]]
      .concat(this.tracksAfter(album, index))
      .concat(loop ? this.tracksBefore(album, index) : []);
  }
}
