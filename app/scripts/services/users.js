angular.module('test.services', [])
  .service('Users', ['$http', function($http) {
    return {
      query: function(cb) {
        $http.get('http://jsonplaceholder.typicode.com/users')
          .success(function(res) {
            cb(null, res);
          })
          .error(function(err) {
            cb(err);
          });
      },
      get: function(user, cb) {
        $http.get('http://jsonplaceholder.typicode.com/users/' + user.id)
          .success(function(res) {
            cb(null, res);
          })
          .error(function(err) {
            cb(err);
          });
      }
    };
  }]);
