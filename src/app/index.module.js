import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import HomeController from './home/home.controller';
import AboutController from './about/about.controller';
import MusicController from './music/music.controller';
import CalendarController from './calendar/calendar.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';

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
  .controller('MusicController', MusicController)
  .controller('CalendarController', CalendarController)
  .directive('iconsfallNavbar', () => new NavbarDirective());
