(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .service('IssueService', IssueService);

    IssueService.$inject = ['$http'];

    /* @ngInject */
    function Service($http) {
       return {
         get: function(mileStone,status,label) {
           // param = [mileStone,status];

         };
       }
    }
})();
