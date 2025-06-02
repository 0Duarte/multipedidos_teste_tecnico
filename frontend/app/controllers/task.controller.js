angular.module('todoApp').controller('TaskController', function ($scope, $location, $timeout, TaskService, LoginService) {
    if (!LoginService.isAuthenticated()) {
        $location.path('/login');
    }

    $scope.tasks = [];
    $scope.newTask = {};

    function loadTasks(page = 1) {
        TaskService.getTasks(page, $scope.searchText).then(res => {
            $scope.tasks = res.data.data;
            $scope.currentPage = res.data.current_page;
            $scope.lastPage = res.data.last_page;
            $scope.total = res.data.total;
        });
    }

    $scope.goToPage = function (page) {
        if (page >= 1 && page <= $scope.lastPage) {
            loadTasks(page);
        }
    };

    $scope.today = moment().format('YYYY-MM-DD');

    $scope.addTask = function () {
        $scope.newTaskErrors = [];
        $scope.newTask.due_date = moment($scope.newTask.due_date).format('YYYY-MM-DD');
        TaskService.createTask($scope.newTask)
            .then(() => {
                $scope.newTask = {};
                $scope.showAddTaskModal = false; 
                loadTasks();
            })
            .catch((error) => {
                if (error.data && error.data.errors) {
                    $scope.newTaskErrors = Object.values(error.data.errors).flat();
                } else if (error.data && error.data.message) {
                    $scope.newTaskErrors = [error.data.message];
                } else {
                    $scope.newTaskErrors = ['Erro ao criar tarefa.'];
                }
            });
    };

    $scope.editTask = function (task) {
        TaskService.updateTask(task).then(function () {
            loadTasks($scope.currentPage);
        });
    };

    $scope.deleteTask = function (id) {
        if (confirm('Excluir esta tarefa?')) {
            TaskService.deleteTask(id).then(loadTasks);
        }
    };

    $scope.showAddTaskModal = false;

    $scope.openAddTaskModal = function () {
        $scope.showAddTaskModal = true;
    };

    $scope.closeAddTaskModal = function () {
        $scope.showAddTaskModal = false;
    };

    $scope.showEditTaskModal = false;
    $scope.editTaskData = {};

    $scope.openEditTaskModal = function (task) {
        console.log('Opening edit modal for task:', task);
        $scope.editTaskData = angular.copy(task);
        if ($scope.editTaskData.due_date) {
            var parts = $scope.editTaskData.due_date.split('-');
            $scope.editTaskData.due_date = new Date(parts[0], parts[1] - 1, parts[2]);
        }
        $scope.showEditTaskModal = true;
    };

    $scope.closeEditTaskModal = function () {
        $scope.showEditTaskModal = false;
    };

    $scope.updateTask = function () {
        $scope.editTaskErrors = [];
        $scope.editTaskData.due_date = moment($scope.editTaskData.due_date).format('YYYY-MM-DD');

        TaskService.updateTask($scope.editTaskData)
            .then(() => {
                $scope.showEditTaskModal = false;
                loadTasks($scope.currentPage);
            })
            .catch((error) => {
                if (error.data && error.data.errors) {
                    $scope.editTaskErrors = Object.values(error.data.errors).flat();
                } else if (error.data && error.data.message) {
                    $scope.editTaskErrors = [error.data.message];
                } else {
                    $scope.editTaskErrors = ['Erro ao atualizar tarefa.'];
                }
            });
    };

    $scope.logout = function () {
        LoginService.logout();
        $location.path('/login');
    };

    let searchTimeout;
    $scope.$watch('searchText', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            if (searchTimeout) $timeout.cancel(searchTimeout);
            searchTimeout = $timeout(function () {
                loadTasks();
            }, 400);
        }
    });

    loadTasks();
});
