describe('Header controller test', function() {
  var scope, $rootScope, controller;
  // Instatiate  our main module
  beforeEach(function() {
    module('test');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();
    controller = $controller('HeaderCtrl', {
      $scope: scope
    });
  }));

  // make the assertions

  it('should call Users.query', function() {
    expect(scope.menu).toBeDefined();
    expect(typeof scope.menu).toBe('object');
  });
});
