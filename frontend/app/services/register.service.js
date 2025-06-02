angular.module('todoApp').service('RegisterService', function($http) {
  const apiUrl = 'http://localhost:8000/api';

  return {
    register(user) {
      return $http.post(`${apiUrl}/register`, user);
    }
  };
});

  