export default function runBlock($rootScope, $location) {
  'ngInject';

  // Track view on Google Analytics

  var changeStartTime;
  $rootScope.$on('$routeChangeStart', () => {
    changeStartTime = Date.now();

    // TODO: do it the angular way
    const path = $location.path();
    angular.element(document.documentElement).attr('data-location', path);
  });

  $rootScope.$on('$routeChangeSuccess', () => {
    const path = $location.path();
    ga('send', 'pageview', { page: path });
    gat('Views', 'ChangeSuccess', changeStartTime, path);
  });
}
