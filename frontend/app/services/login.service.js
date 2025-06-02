angular.module('todoApp').factory('LoginService', function($http, $window) {
  const apiUrl = 'http://localhost:8000/api';

  return {
    login(user) {
      return $http.post(`${apiUrl}/login`, user)
        .then(res => {
          $window.localStorage.setItem('token', res.data.token);
        });
    },
    getToken() {
      return $window.localStorage.getItem('token');
    },
    isAuthenticated() {
      return !!$window.localStorage.getItem('token');
    },
    logout() {
      $window.localStorage.removeItem('token');
    }
  };
});
