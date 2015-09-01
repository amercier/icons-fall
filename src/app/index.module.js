import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import HomeController from './home/home.controller';
import AboutController from './about/about.controller';
import DiscographyService from './music/discography.service';
import MusicController from './music/music.controller';
import CalendarController from './calendar/calendar.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';

import AudioService from '../app/components/player/audio.service';
import PlayerService from '../app/components/player/player.service';
import FormatDurationFilter from '../app/components/player/duration.filter';
import PlayerController from '../app/components/player/player.controller';
import PlayerDirective from '../app/components/player/player.directive';
import playerAnalytics from '../app/components/player/player.analytics';

angular.module('iconsfall', [
  'ngAnimate',
  'ngResource',
  'ngRoute',
  'ngMedia',
  'mm.foundation',
  'rt.encodeuri',
  'angular-timeline',
  'duScroll'
])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('HomeController', HomeController)
  .controller('AboutController', AboutController)
  .factory('discography', $sce => new DiscographyService($sce))
  .controller('MusicController', MusicController)
  .controller('CalendarController', CalendarController)
  .directive('iconsfallNavbar', () => new NavbarDirective())

  .factory('audio', $document => new AudioService($document).element)
  .factory('player', ($rootScope, audio) => new PlayerService($rootScope, audio))
  .filter('formatDuration', () => new FormatDurationFilter().filter)
  .controller('PlayerController', ($scope, discography, player) => new PlayerController($scope, discography, player))
  .directive('iconsfallPlayer', () => new PlayerDirective())
  .run(playerAnalytics);
