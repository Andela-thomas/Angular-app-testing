angular.module('test.controllers', [])
  .controller('HeaderCtrl', ['$scope', function($scope) {
    $scope.menu = [{
      state: 'home',
      name: 'Home'
    }, {
      state: 'about',
      name: 'About'
    }, {
      state: 'contact',
      name: 'Contact us'
    }];
  }]);
