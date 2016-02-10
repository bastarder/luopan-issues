(function(){

  'use strict';

  angular
    .module('gitLabApp')
    .config(function($routeProvider) {
      var getTemplate = function(name) {
        return ['controller/', name, '.html'].join('');
      };

      $routeProvider
        .when('/', {
          templateUrl  : getTemplate('login.controller'),
          controller   : 'LoginController',
          controllerAs : 'vm'
        })
        .when('/main', {
          templateUrl  : getTemplate('main.controller'),
          controller   : 'MainController',
          controllerAs : 'vm'
        })
    });

})();
