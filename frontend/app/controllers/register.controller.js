angular.module('todoApp').controller('RegisterController', function($scope, $location, RegisterService) {
  $scope.user = {};
  $scope.errors = [];

  $scope.register = function() {
    $scope.errors = [];
    RegisterService.register($scope.user)
      .then(() => $location.path('/login'))
      .catch((error) => {
        if (error.data && error.data.errors) {
          $scope.errors = Object.values(error.data.errors).flat();
        } else {
          $scope.errors = ['Erro ao registrar. Verifique os dados e tente novamente.'];
        }
      });
  };

  $scope.goToLogin = function() {
    $location.path('/login');
  };
});