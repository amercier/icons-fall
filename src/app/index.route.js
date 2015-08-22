function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      id: 'home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .otherwise({
      redirectTo: '/'
    });
}

export default routerConfig;
