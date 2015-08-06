import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import HomeController from './home/home.controller';
import MusicController from './music/music.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';

angular.module('iconsfall', ['ngAnimate', 'ngResource', 'ngRoute', 'mm.foundation'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('HomeController', HomeController)
  .controller('MusicController', MusicController)
  .directive('iconsfallNavbar', () => new NavbarDirective());
