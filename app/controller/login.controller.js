(function() {
  'use strict';

  angular
    .module('gitLabApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope','LoginService','localStorageService','PnotifyService','$location'];

  /* @ngInject */
  function LoginController($scope, LoginService, localStorageService, PnotifyService, $location) {
    var vm = this;

    var token = localStorageService.get('TOKEN') || '';
    if(!token){
      activate();
    }else{
      $location.path('/main/');
    };

    function activate(){

      vm.error = [];
      vm.username = localStorageService.get('username') || '';
      vm.login = login;

      function login() {
        localStorageService.set('username',vm.username);
        vm.error = [];
        var username = angular.copy(vm.username),
            password = angular.copy(vm.password);

        if( !username || !password ) {
          vm.error.push('账号或密码不能为空!');
          return ;
        };

        //请求登陆;
        vm.loginPromise = LoginService.connect(vm.username,vm.password)
          .then(onSuccess)
          .catch(onFaild)

        function onSuccess(response) {
          PnotifyService.msg({title:'登陆成功'});
          localStorageService.set('TOKEN',response.data.private_token);
          $location.path('/main/');
        };

        function onFaild(response) {
          vm.error.push(response.msg);
        };

      };

    }

  };
})();
