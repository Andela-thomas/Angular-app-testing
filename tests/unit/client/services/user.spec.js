describe('User Service Test', function() {

  beforeEach(function() {
    module('test');
  });

  var Users, $httpBackend, $http;

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'http://jsonplaceholder.typicode.com/users').respond(200, {
      res: 'res'
    });
    $http = $injector.get('$http');
    Users = $injector.get('Users');
  }));

  describe('Users unit tests', function() {
    it('query should be a function', function() {
      $http.get = sinon.stub().returns($http);
      $http.success = sinon.stub().returns($http);
      $http.error = sinon.stub();
      var cb = sinon.spy();
      Users.query(cb);
      expect(Users.query).toBeDefined();
      expect($http.get.called).toBe(true);
      expect($http.success.called).toBe(true);
      expect($http.error.called).toBe(true);
      $http.success.args[0][0]({
        res: 'res'
      });
      expect(cb.called).toBe(true);
      expect(typeof cb.args[0][1]).toBe('object');
      expect(cb.args[0][1].res).toBe('res');

    });

    it('should test for failure of Users.query', function() {
      $http.get = sinon.stub().returns($http);
      $http.success = sinon.stub().returns($http);
      $http.error = sinon.stub();
      var cb = sinon.spy();
      $httpBackend.when('GET', 'http://jsonplaceholder.typicode.com/users').respond(500, {
        err: 'err'
      });
      Users.query(cb);
      expect(Users.query).toBeDefined();
      expect($http.get.called).toBe(true);
      expect($http.error.called).toBe(true);
      $http.error.args[0][0]({
        err: 'err'
      });
      expect(cb.called).toBe(true);
      expect(typeof cb.args[0][0]).toBe('object');
      expect(cb.args[0][0].err).toBe('err');

    });

  });
});
