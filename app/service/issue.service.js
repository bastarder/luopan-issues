(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .service('IssueService', IssueService);

    IssueService.$inject = ['$http','API','localStorageService','$q','GROUP_BY','MAIN_LABEL'];

    /* @ngInject */
    function IssueService($http, API, localStorageService, $q, GROUP_BY, MAIN_LABEL) {
       return {
         get: function(mileStones) {
           console.log('版本号:',mileStones);
           var token = localStorageService.get('TOKEN');
           var promises = []; //存放所有请求;
           var deferred = $q.defer();
           var result = {};

           if(!token){
             PnotifyService.msg({title:'查询issues失败!',text:'请尝试重新登录! No TOKEN',type:'warning'});
             deferred.reject('');
             return deferred.promise;
           }else{
             var parm = {
               private_token : token,
               per_page : 100
             };
           };

           _.each(mileStones,function(mileStone,projectId){
             if(mileStone.length<1) {
               return '';
             };
             _.each(mileStone,function(mile){
               var promise = $http.get(API + 'projects/' + projectId + '/milestones/' + mile.id + '/issues',{ params:parm })
                promises.push(promise);
             });
           });

           $q.all(promises)
            .then(function(data){
              _.each(data,function(response){
                if( !response.data || response.data.length<1 ){
                  return '';
                }
                var projectId = response.data[0].project_id;
                if(!result[projectId]){
                  result[projectId] = [];
                };
                result[projectId] = result[projectId].concat(response.data);
              });
              var results = new issueGroup(result);
              // console.log(results.getByStatus(['closed']).getPersonalReport());
              deferred.resolve(results);
            })

           return deferred.promise;
         },
       }

       //创建处理issue的类;
       function issueGroup(issueGroup) {
         var self = this;

         self.originIssues = angular.copy(issueGroup);
         self.issues = angular.copy(issueGroup);
         self.getByStatus = getByStatus;
         self.getByLabels = getByLabels;
         self.init = init;
         self.getPersonalReport = getPersonalReport;
         /**
          * @name getByStatus
          * @module issueGroup
          * @kind function
          *
          * @description 将issues根据状态筛选;
          * @param [state] 状态 如 ：['opened','reopened','closed']
          * @returns 返回修改后的类;
          */
         function getByStatus(status){

           var issues = self.issues;

           _.each(issues,function(project,index){
             issues[index] = _.filter(project,function(issue){
               if(_.indexOf(status,issue.state)!== -1){
                 return true;
               }
               return false;
             });
           })

           self.issues = issues;
           return this;

         };

         /**
          * @name getByLabels
          * @module issueGroup
          * @kind function
          *
          * @description 将issues根据标签筛选;
          * @param [labelName] 必须有的标签;
          * @param [labelName] 必须没有的标签;
          * @param [labelName] 必须有其中一个标签;
          * @returns 返回修改后的类;
          */
         function getByLabels(must, mustNot, mustHaveOne){
           var issues = self.issues;

           _.each(issues,function(project,index){
             issues[index] = _.filter(project,function(issue){

               //判断必须没有的标签;
               if(mustNot && _.union(mustNot,issue.labels).length !== (mustNot.length + issue.labels.length)){
                 return false;
               }

               //判断必须有一个的标签;
               if(mustHaveOne && _.union(mustHaveOne,issue.labels).length === (mustHaveOne.length + issue.labels.length)){
                 return false;
               }

               //判断必须有的标签;
               if(must && _.union(must,issue.labels).length !== issue.labels.length){
                 return false;
               }
               return true;
             });

           })

           self.issues = issues;
           return this;

         };

         //将对象中的issues按照 bug 和feature 分成 0 1 两组
         function init(){
           var bugLabels = GROUP_BY.BUG;
           var featureLabels = GROUP_BY.FEATRUE;
           var issues = angular.copy(self.issues);

           _.each(issues,function(project,index){
             var bug = [];
             var feature = [];
             //分为bug和feature两组
             _.each(project,function(issue){
               if(_.union(bugLabels,issue.labels).length !== (bugLabels.length + issue.labels.length)){
                 bug.push(issue);
                 return '';
               };
               if(_.union(featureLabels,issue.labels).length !== (featureLabels.length + issue.labels.length)){
                 feature.push(issue);
               };
             });

             //计算mainLabel;
             bug = _.map(bug,function(issue){
               issue.mainLabel = getMainLabel(issue.labels);
               return issue;
             });
             feature = _.map(feature,function(issue){
               issue.mainLabel = getMainLabel(issue.labels);
               return issue;
             });

             //拼装数据;
             issues[index] = {
               issues : [bug,feature],
               report : getReport([bug,feature])
             };

           })
           console.log('show:',issues);
           return issues;

         };

         //获取统计数据
         function getReport(issues){
           var bug = issues[0];
           var feature = issues[1];
           var groups = ['👿机票组','👿酒店组','👿基础组','👿客服组'];
           var labelExp = /^👿[\u4E00-\u9FA5\w]*组$/;
           var result = {};
           _.each(bug,function(issue){
             var label = '';
             //获取当前label的组;
             _.each(issue.labels,function(la){
               if(la.match(labelExp)){
                 label = la;
               };
             });

             if(!result[label]){ result[label] = { bug:[],feature:[] } };

             result[label].bug.push(issue);
           });

           _.each(feature,function(issue){
             var label = '';
             //获取当前label的组;
             _.each(issue.labels,function(la){
               if(la.match(labelExp)){
                 label = la;
               };
             });

             if(!result[label]){ result[label] = { bug:[],feature:[] } };

             result[label].feature.push(issue);
           });

           return result;
         };

         //获取mainlabels;
         function getMainLabel(labels){
           var deleteLabels = MAIN_LABEL.deleteLabels;
           var dafaultLabels = MAIN_LABEL.dafaultLabels;
           var label = null;
           if(!labels){
             return null;
           }
           for(var i=0;i<labels.length;i++){
             if(_.indexOf(deleteLabels,labels[i])===-1){
               label = labels[i];
               break;
             };
           };
           if(!label){
             _.each(labels,function(la){
               if(_.indexOf(dafaultLabels,la)===-1){
                 label =  ' ';
               }else{
                 label = la;
               }
             });
           }
           return label;
         };

         //获取个人统计数据;
         function getPersonalReport(){
          var issues = angular.copy(self.issues);
          var result = {};
          var bugLabels = GROUP_BY.BUG;
          var featureLabels = GROUP_BY.FEATRUE;

          _.each(issues,function(project,index){
            _.each(project,function(issue){
              //获取issue处理人;
              try{
                var name = issue.assignee.name;
              }catch(error){
                var name = issue.author.name;
              }
              //判断对象是否存在;
              if(!result[name]){
                result[name] = {
                  bug:[],
                  feature:[]
                };
              };

              if(_.union(bugLabels,issue.labels).length !== (bugLabels.length + issue.labels.length)){
                result[name].bug.push(issue);
                return '';
              };
              if(_.union(featureLabels,issue.labels).length !== (featureLabels.length + issue.labels.length)){
                result[name].feature.push(issue);
              };

            });
          })

          return result;
         };

       };
    }

})();
