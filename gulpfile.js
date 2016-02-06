
var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var _root = 'app';
var _host = '0.0.0.0';
var _port = 9000;

//创建本地测试服务;
gulp.task('connect', function() {
  connect.server({
    root: _root, //根目录
    host: _host, //ip
    port: _port
  });
});

//less;
gulp.task('less', function () {
  //编译目录下的所有less文件
  gulp.src('app/styles/less/*.less')
    //如果less文件报错,不执行编译,并提示错误;
    .pipe(plumber({
       errorHandler: notify.onError('\nless文件错误:\n <%= error.message %>\n')
     }))
    //生成CSS时的兼容性;
    .pipe(autoprefixer({
       browsers: ['last 2 versions', 'last 3 Safari versions'],
       cascade: true,
       remove: true
     }))
    .pipe(less())
    //向目录生成css文件;
    .pipe(gulp.dest('app/styles/css'));
});
//监听less文件的改变;
gulp.task('watch-less', ['less'], function () {
  gulp.watch('app/styles/less/*.less', ['less']);
});

//default
gulp.task('default', ['watch-less','connect']);
