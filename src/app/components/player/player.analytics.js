export default function playerAnalytics(player) {
  'ngInject';

  player.on('start', function(playlist, index) {
    gae('Music', 'Start', playlist[index].toString());
  });

  player.on('next', function(playlist, index, auto) {
    if (auto) {
      gae('Music', 'Track Completed', playlist[index - 1].toString());
    }
    else {
      gae('Music', 'Switch From', playlist[index - 1].toString());
      gae('Music', 'Switch To', playlist[index].toString());
    }
  });

  player.on('previous', function(playlist, index) {
    gae('Music', 'Switch From', playlist[index + 1].toString());
    gae('Music', 'Switch To', playlist[index].toString());
  });

  player.on('ended', function(playlist, index) {
    gae('Music', 'Album Completed', playlist[index].album.title);
  });
}
