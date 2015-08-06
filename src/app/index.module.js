/* global toastr:false */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';

angular.module('iconsfall', ['ngAnimate', 'ui.router', 'mm.foundation'])
  .constant('toastr', toastr)
  .config(config)

  .config(routerConfig)

  .run(runBlock)
  .controller('MainController', MainController)
  .directive('acmeNavbar', () => new NavbarDirective());
