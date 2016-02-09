var gulp    = require('gulp'),
    babel   = require('gulp-babel'),
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

gulp.task('js-compile', function() {
  gulp.src('src/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['js-hint']);
});

gulp.task('default', [ 'js-hint'
                     , 'watch' ]);
  
