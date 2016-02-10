(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .directive('giSearch', giSearch);

    /* @ngInject */
    function giSearch() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'directive/gi-search.directive.html',
            scope: {
              mileStone:'=mileStone',
            },
            // link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        // function linkFunc(scope, el, attr, ctrl) {
        //
        // };
    }

    Controller.$inject = ['$scope','mileStoneService'];

    /* @ngInject */
    function Controller($scope,mileStoneService) {
        var vm = this;
        vm.mileStonePromise = mileStoneService.get()
                                .then(function(result){
                                  vm.milestoneGroup = angular.copy(result);
                                });
        vm.search = 'haha';
        vm.input = [
          {id:'1',title:'ceshi'},
          {id:'2',title:'1232143'},
          {id:'3',title:'41324'},
          {id:'4',title:'c53245eshi'},
        ]

    }
})();
