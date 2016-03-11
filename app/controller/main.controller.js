(function() {
  'use strict';

  angular
    .module('gitLabApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope','LoginService','localStorageService','PnotifyService','mileStoneService','IssueService','$location','TO_ISSUE_PAGE'];

  /* @ngInject */
  function MainController($scope, LoginService, localStorageService, PnotifyService, mileStoneService, IssueService, $location, TO_ISSUE_PAGE) {
    var vm = this;
    //判断是否登陆;
    var token = localStorageService.get('TOKEN') || '';
    if(token){
      activate();
    }else{
      $location.path('/');
    };

    function activate() {

      vm.mileStone = {}; //被选中的mileStone;
      vm.showData = {};
      vm.personalReport = {};
      vm.createVersion = createVersion; //创建更新页面;
      vm.createORVersion = createORVersion; //创建OR页面;
      vm.toIssueUrl = TO_ISSUE_PAGE;
      vm.logout = LoginService.logout;

      function createVersion(){
        vm.curMileStone = angular.copy(vm.mileStone);
        vm.issuesPromise = IssueService.get(vm.mileStone);
        vm.issuesPromise.then(function(result){
            var issueGroup = result;
            issueGroup = issueGroup
                           .getByStatus(['closed'])
                           .getByLabels(['RESOLVED'],'','');
            vm.showData = issueGroup.init();
            vm.personalReport = issueGroup.getPersonalReport();
          })
      };

      function createORVersion(){
        vm.curMileStone = angular.copy(vm.mileStone);
        vm.issuesPromise = IssueService.get(vm.mileStone);
        vm.issuesPromise.then(function(result){
            var issueGroup = result;
            issueGroup = issueGroup
                           .getByStatus(['opened','reopened'])
                           .getByLabels(['RESOLVED'],'','');
            vm.showData = issueGroup.init();
            vm.personalReport = issueGroup.getPersonalReport();
          })
      };

    }

  };

})();
