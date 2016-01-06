describe('profile controller test', function() {
  var Users, scope, $stateParams, controller;

  beforeEach(function() {
    module('test');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    Users = $injector.get('Users');
    stateParams = $injector.get('$stateParams');
    stateParams.id = true;

    scope = $rootScope.$new();

    sinon.stub(Users, 'get', function(obj, cb) {
      cb(null, {});
    });

    controller = $controller('ProfileCtrl', {
      $scope: scope,
      $stateParams: stateParams,
      Users: Users
    });
  }));

  it('should get user', function() {
    expect(Users.get.called).toBe(true);
    expect(typeof scope.user).toBe('object');
  });

});
