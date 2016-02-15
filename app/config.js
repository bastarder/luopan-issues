(function() {
    'use strict';

    angular
        .module('gitLabApp')

        //url;
        .constant('API', 'http://180.97.80.177:8087/api/v3/')

        //跳转到指定issue
        .constant('TO_ISSUE_PAGE',{
          url:'http://180.97.80.177:8087/',
          project: {
            '1':'webfront/customer',
            '2':'webfront/customer-service',
            '8':'jiketravel_server/server'
          }
        })

        //工程
        .constant('PROJECT',{
          '1': '客户系统',
          '2': '客服系统',
          '8': '后台系统'
        })

        //需要展示的工程ID
        .constant('NEED_PROJECT',[
          1,2,8
        ])

        //不需要展示的mileStone ID,用于过滤mileStone;
        .constant('DONT_NEED_MILESTONE',[
          13,15,16
        ])

        //分组中代表BUG 和 feature的标签;
        .constant('GROUP_BY',{
          BUG:['P1','P2','P3','P4','BUG'],
          FEATRUE:['FEATURE']
        })

        //统计分类;
        .constant('MAIN_LABEL',{
          deleteLabels : ['RESOLVED','P1','P2','P3','P4','BUG','FEATURE','👿机票组','👿酒店组','👿基础组','👿客服组'],
          dafaultLabels : ['👿机票组','👿酒店组','👿基础组','👿客服组']
        })
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
