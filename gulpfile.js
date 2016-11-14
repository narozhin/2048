
'use strict'

var gulp = require('gulp'),
    uglify    = require('gulp-uglify'),
    rigger    = require('gulp-rigger'),
    gls       = require('gulp-live-server');

var paths = {
  build : {
    html : 'www/',
    js   : 'www/js',
    img  : 'www/img'
  },
  src : {
    html : 'src/index.html',
    js   : 'src/js/index.js',
    img  : 'src/img/*.{jpg, png, jpeg}'
  },
  tmp : {
    html : '.tmp/',
    js   : '.tmp/js/'
  }
}

gulp.task('dev', [
  'js:dev',
  'html:dev',
  'live'
]);

gulp.task('make', [
  'js:build',
  'html:build',
  'img:build'
]);

gulp.task('live', () => {
  var server = gls.static('.tmp', 8080);
  server.start();
  gulp.watch(['src/js/classes/**/*.js', 'src/js/app.js'], function (file) {
    gulp.src(paths.src.js)
      .pipe(rigger())
        .pipe(gulp.dest(paths.tmp.js));
  });
});

gulp.task('js:dev', () => {
  gulp.src(paths.src.js)
    .pipe(rigger())
      .pipe(gulp.dest(paths.tmp.js));
});

gulp.task('html:dev', () => {
  gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.tmp.html));
});

gulp.task('js:build', () => {
  gulp.src(paths.src.js)
    .pipe(rigger())
      .pipe(uglify())
        .pipe(gulp.dest(paths.build.js));
});

gulp.task('html:build', function () {
  gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.build.html));
});

gulp.task('img:build', function() {
    gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.build.img));
});
