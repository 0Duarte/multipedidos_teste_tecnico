angular.module('todoApp').config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'LoginController'
    })
    .when('/tasks', {
      templateUrl: 'app/views/tasks.html',
      controller: 'TaskController'
    })
    .when('/register', {
      templateUrl: 'app/views/register.html',
      controller: 'RegisterController'
    })
    .otherwise({
      redirectTo: '/login'
    });
});
