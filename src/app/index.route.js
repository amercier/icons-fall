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
    .otherwise({
      redirectTo: '/'
    });
}

export default routerConfig;
