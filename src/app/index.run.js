export default function runBlock($rootScope, $location, $timeout, meta) {
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

  // Update title after route change
  $rootScope.$on('$routeChangeSuccess', () => {
    $timeout(() => {
      document.title = meta.getTitle();
    });
  });
}
