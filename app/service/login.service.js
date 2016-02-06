(function() {
    'use strict';

    angular
        .module('gitLabApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', 'API', 'localStorageService'];

    /* @ngInject */
    function LoginService($http, $q, API, localStorageService) {
        return {
            /**
             * @LoginService
             * @name connect
             * @module gitLabApp
             * @kind function
             *
             * @description login the gitlab ,return the object of user.
             * @param {string|number} the username.
             * @param {string|number} the password.
             * @returns promise {data:'', success:'', msg:''}.
             */
            connect: function(username, password) {
                var username = username ? username.toString() : '',
                    password = password ? password.toString() : '',
                    result   = { success: false },
                    parm     = {},
                    deferred = $q.defer();
                //拼装请求参数;
                if( !username || !password ) {
                    result.msg = '操作失败 , 参数缺失 !';
                    deferred.reject(result);
                    return deferred.promise;
                }else {
                    parm = {
                      email    : username,
                      password : password
                    }
                };
                //请求登陆;
                $http.post(API + 'session', parm)
                    .success(onSuccess)
                    .error(onFaild)

                return deferred.promise;

                function onSuccess(response) {
                    result = {
                      data    : response,
                      msg     : '登陆成功!',
                      success : true
                    }
                    localStorageService.set('USER',result);
                    deferred.resolve(result);
                };
                function onFaild(response) {
                    result = response.message;
                    result = {
                      data   : response,
                      msg    : response.message,
                      success: false
                    }
                    deferred.reject(result);
                };
            },

            /**
             * @LoginService
             * @name getUser
             * @module gitLabApp
             * @kind function
             *
             * @description get the user who has login.
             * @param {string} the key of the user object.
             * @returns the key in object's value.
             */
            getUser: function(key) {
                var user = localStorageService.get('USER');

                if(!user) {
                    return '';
                };

                if(!key) {
                    return user;
                };

                if(user.hasOwnProperty(key)) {
                    return user[key];
                };

                return '';
            }

        };
    }
})();
