(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .constant('API', 'http://180.97.80.177:8087/api/v3/')
        .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('gitLabApp');
        }])
})();
