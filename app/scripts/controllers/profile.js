angular.module('test.controllers')
  .controller('ProfileCtrl', ['$scope', '$stateParams', 'Users', function($scope, $stateParams, Users) {
    $scope.profile_img = 'http://lorempixel.com/400/400/people';
    if ($stateParams.id) {
      Users.get({
        id: $stateParams.id
      }, function(err, res) {
        if (err) {
          Materialize.toast('failed to fetch user', 5000);
        } else {
          $scope.user = res;
        }
      });
    }
  }]);
