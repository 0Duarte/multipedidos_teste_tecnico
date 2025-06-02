angular.module('todoApp').factory('TaskService', function($http, LoginService) {
  const apiUrl = 'http://localhost:8000/api/task';

  function getHeaders() {
    return { headers: { 'Authorization': 'Bearer ' + LoginService.getToken() } };
  }

  return {
    getTasks(page = 1, search = '') {
      const params = [];
      if (page) params.push(`page=${page}`);
      if (search) params.push(`search=${encodeURIComponent(search)}`);
      const query = params.length ? `?${params.join('&')}` : '';
      return $http.get(apiUrl + query, getHeaders());
    },
    createTask(task) {
      return $http.post(apiUrl, task, getHeaders());
    },
    updateTask(task) {
      return $http.put(`${apiUrl}/${task.id}`, task, getHeaders());
    },
    deleteTask(id) {
      return $http.delete(`${apiUrl}/${id}`, getHeaders());
    }
  };
});
