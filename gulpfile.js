var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify');

gulp.task('js-hint', function() {
  gulp.src('src/*.js')
      .pipe(jshint({laxcomma: true}))
      .pipe(jshint.reporter(stylish));
});

gulp.task('js-compile_src-pro', function() {
  gulp.src('src/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build'))
});

gulp.task('js-compile_src-dev', function() {
  gulp.src('src/*.js')
      .pipe(concat('main.dev.js'))
      .pipe(gulp.dest('./build'))
});

gulp.task('js-compile_vendor', function() {
  gulp.src('vendor/*.js')
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
gulp.watch('src/*.js', ['js-hint'
                       ,'js-compile_src-dev'
                       ,'js-compile_src-pro'
                       ,'js-compile_vendor']);
});

gulp.task('default', ['js-hint'
                     ,'js-compile_src-dev'
                     ,'js-compile_src-pro'
                     ,'js-compile_vendor'
                     ,'watch']);
  
