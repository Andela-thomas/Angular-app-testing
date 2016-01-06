(function() {
  // Controller, services, directives and filters declaration
  angular.module('test.controllers', []);
  angular.module('test.services', []);
  angular.module('test.directives', []);
  angular.module('test.filters', []);

  // require services
  require('./services/users');


  // require controllers
  require('./controllers/header');
  require('./controllers/profile');
  require('./controllers/home');

  // require filters

  // require directives

  //Intiliaze angular app
  window.app = angular.module('test', [
    'test.controllers',
    'test.services',
    'test.directives',
    'test.filters',
    'ngRoute',
    'ui.router',
    'ngResource'
  ]);

  // On run
  window.app.run(['$rootScope', function($rootScope) {
    $rootScope.data = {
      title: 'Angular | Testine'
    };
  }]);


  // $urlMatcherFactoryProvider, $stateProvider, $urlRouterProvider, $locationProvider

  window.app.config(['$urlMatcherFactoryProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($urlMatcherFactory, $stateProvider, $urlRouterProvider, $locationProvider) {
      // if the url is not macthed
      $urlRouterProvider.otherwise('/');
      // make the ui.router case insensitive
      //$urlMatcherFactory.caseInsensitive(true);
      // Define your app states
      // .$stateProvider.state(@statename,{@url, @controller, @templateUrl})
      $stateProvider
        .state('home', {
          url: '/',
          controller: 'HomeCtrl',
          templateUrl: 'views/home.html'
        })
        .state('profile', {
          url: '/profile/{id}/view',
          controller: 'ProfileCtrl',
          templateUrl: 'views/view.html'
        })
        .state('404', {
          url: '/404',
          templateUrl: 'views/404.html'
        });
      // Trim the #! from the url
      //$locationProvider.html5Mode(true);
    }
  ]);
})();
