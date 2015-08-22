export default function runBlock($rootScope, $location) {
  'ngInject';

  // Track view on Google Analytics

  var changeStartTime;
  $rootScope.$on('$routeChangeStart', () => {
    changeStartTime = Date.now();
  });

  $rootScope.$on('$routeChangeSuccess', () => {
    const path = $location.path();
    ga('send', 'pageview', { page: path });
    gat('Views', 'ChangeSuccess', changeStartTime, path);
  });
}
