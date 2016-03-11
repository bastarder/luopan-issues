(function() {
  'use strict';

  angular
    .module('gitLabApp')
    .service('mileStoneService',mileStoneService)
    //依赖注入;
    mileStoneService.$inject = ['$q','$http','API','LoginService','localStorageService','PnotifyService','NEED_PROJECT'];

    //MileStoneService 服务主函数;
    function mileStoneService($q, $http, API, loginService, localStorageService, PnotifyService, NEED_PROJECT){
      return {
        get: function(){
          var token = localStorageService.get('TOKEN');
          var promise = []; //存放所有请求;
          var project = NEED_PROJECT;  //读取要获取的工程列表;
          var deferred = $q.defer();

          if(!token){
            PnotifyService.msg({title:'获取版本号错误!',text:'请尝试重新登录! No TOKEN',type:'warning'});
            deferred.reject('');
            return deferred.promise;
          }else{
            var parm = {
              private_token:token
            };
          };

          _.each(project,function(projectID) {
            var prom = $http.get(API + 'projects/' + projectID + '/milestones',{params:parm});
            promise.push(prom);
          });

          $q.all(promise)
            .then(function(data){
              var result = {};
              var resolve = false;

              _.each(data,function(project){
                resolve = true;
                var record = project.data;
                var projectID = record[0].project_id;
                result[projectID] = record;
              });

              if(resolve){
                PnotifyService.msg({title:'获取版本号成功!'});
                deferred.resolve(result);
              }else {
                PnotifyService.msg({title:'获取版本号错误!',text:'NO DATA',type:'warning'});
                deferred.reject('');
              }
            });

          return deferred.promise;
        }
      };

    };//MileStoneService 服务主函数 End;


})();
