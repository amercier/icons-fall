'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('src/{app,components}/*.scss')
    .pipe(wiredep({
        directory: 'src/bower_components'
    }))
    .pipe(gulp.dest('src'));

  gulp.src('src/*.html')
    .pipe(wiredep({
      directory: 'src/bower_components',
      exclude: [
        'angular-bootstrap',
        'fastclick',
        'jquery.cookie',
        'jquery-placeholder',
        'modernizr'
      ],
      overrides: {
        foundation: {
          main: [
            'js/foundation/foundation.js',
            'js/foundation/foundation.topbar.js'
          ]
        }
      }
    }))
    .pipe(gulp.dest('src'));
});
