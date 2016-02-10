(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope','LoginService','localStorageService','PnotifyService','mileStoneService'];

    /* @ngInject */
    function MainController($scope, LoginService, localStorageService, PnotifyService, mileStoneService) {
      var vm = this;
    };
})();
