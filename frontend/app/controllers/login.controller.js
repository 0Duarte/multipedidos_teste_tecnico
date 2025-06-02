angular.module('todoApp').controller('LoginController', function($scope, $location, LoginService) {
  $scope.user = {};
  $scope.login = function() {
    LoginService.login($scope.user)
      .then(() => $location.path('/tasks'))
      .catch(() => {
        $scope.login = $scope.login || {};
        $scope.login.error = 'Credenciais inválidas!';
      });
  };

  $scope.goToRegister = function() {
    $location.path('/register');
  };
});