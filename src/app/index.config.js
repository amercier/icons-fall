function config ($logProvider, $locationProvider) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  // Enable HTML5 pushState
  $locationProvider.html5Mode(true);
}

export default config;
