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
        // .when('/flt-welcome-0', {
        //   templateUrl: tplFunction('flt-welcome'),
        //   controller: 'FltWelcomeCtrl',
        // })
        // .when('/flights/:q', {
        //   templateUrl: tplFunction('flt'),
        //   controller: 'FlightsCtrl',
        // })
    });


})()
