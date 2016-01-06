angular.module('test.controllers')
  .controller('HomeCtrl', ['$scope', 'Users', function($scope, Users) {
    Users.query(function(err, users) {
      if (err) {
        Materialize.toast('Failed to fetct users', 5000);
      } else {
        $scope.users = users;
      }
    });
  }]);
