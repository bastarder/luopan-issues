(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','LoginService'];

    /* @ngInject */
    function LoginController($scope,LoginService) {
        var vm = this;

        activate();

        function activate() {
            LoginService.connect()
              .catch(function(data){
                console.log(data)
              })

        }
    }
})();
