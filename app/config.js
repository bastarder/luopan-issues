(function() {
    'use strict';

    angular
        .module('gitLabApp')
        //url;
        .constant('API', 'http://180.97.80.177:8087/api/v3/')

        //需要展示的工程ID
        .constant('NEED_PROJECT',[
          1,2,8
        ])

        //不需要展示的mileStone ID,用于过滤mileStone;
        .constant('DONT_NEED_MILESTONE',[
          13,15,16
        ])

        //组件配置;
        .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('gitLabApp');
        }])
        .value('cgBusyDefaults', {
          message: '数据加载中...',
          templateUrl: 'templates/loading.html'
        });

        PNotify.prototype.options.styling = "bootstrap3";
})();
