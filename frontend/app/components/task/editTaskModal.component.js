angular.module('todoApp').component('editTaskModal', {
    bindings: {
        task: '<',
        onClose: '&',
        onUpdate: '&',
        errors: '='
    },
    templateUrl: 'app/components/task/edit-task-modal.html'
});