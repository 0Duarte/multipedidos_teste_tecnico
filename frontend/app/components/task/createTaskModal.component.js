angular.module('todoApp').component('createTaskModal', {
  bindings: {
  task: '=',
  onClose: '&',
  onCreate: '&',
  errors: '=' 
},
  templateUrl: 'app/components/Task/create-task-modal.html',
  
});