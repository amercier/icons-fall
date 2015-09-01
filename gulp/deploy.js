'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var options = {};
if (process.env.GITHUB_TOKEN) {
  options.remoteUrl = 'https://' + process.env.GITHUB_TOKEN + '@github.com/amercier/iconsfall.git';
}

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages(options));
});
