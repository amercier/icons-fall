function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      id: 'home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/music', {
      id: 'music',
      templateUrl: 'app/music/music.html',
      controller: 'MusicController',
      controllerAs: 'music'
    })
    .when('/about', {
      id: 'about',
      templateUrl: 'app/about/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .otherwise({
      redirectTo: '/'
    });
}

export default routerConfig;
