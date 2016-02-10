(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .service('PnotifyService', PnotifyService);

    /* @ngInject */
    function PnotifyService() {
        return {
          /**
           * @PnotifyService
           * @name msg
           * @module gitLabApp
           * @kind function
           *
           * @description 弹出提示框;
           * @param {object} 里面包含提示框的参数;  { title:'haha', text:'hehe', ..... }
           * @returns ''
           */
          msg: function SystemMsg(data){
                  var parm = data;
                  new PNotify({
                    title : parm.title         || 'title Error',
                    text  : parm.text          || '',
                    type  : parm.type          || 'info',
                    delay : Number(parm.delay) || 2500,
                    mouse_reset: false,
                  });
                  return '';
               },
          //aaa:{}
        };
    }
})();
