function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .state('music', {
      url: '/music',
      templateUrl: 'app/music/music.html',
      controller: 'MusicController',
      controllerAs: 'music'
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;
