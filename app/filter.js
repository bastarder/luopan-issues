(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .filter('projectName', projectName);  // projectId  => 对应中文名

    function projectName(PROJECT) {
        return filterFilter
        function filterFilter(input) {
            return PROJECT[input];
        }
    }


})();
