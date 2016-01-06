describe('Home controller test', function() {
  var scope, Users, $rootScope, controller;
  // Instatiate  our main module
  beforeEach(function() {
    module('test');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();
    Users = $injector.get('Users');

    sinon.stub(Users, 'query', function(cb) {
      cb(null, {});
    });

    sinon.stub(Materialize, 'toast');

    controller = $controller('HomeCtrl', {
      $scope: scope,
      Users: Users
    });
  }));

  // make the assertions

  it('should call Users.query', function() {
    expect(Users.query).toBeDefined();
    expect(Users.query.calledOnce).toBe(true);
    expect(scope.users).toBeDefined();
    expect(Materialize.toast.calledOnce).toBe(false);
  });
});
