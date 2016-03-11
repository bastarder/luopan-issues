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
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    };

    Controller.$inject = ['$scope','mileStoneService'];

    /* @ngInject */
    function Controller($scope,mileStoneService) {
        var vm = this;
        vm.mileStonePromise = mileStoneService.get()
                                .then(function(result){
                                  vm.milestoneGroup = angular.copy(result);
                                });

    };

})();
