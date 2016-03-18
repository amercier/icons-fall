'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var Server = require('karma').Server;

function runTests (singleRun, done) {
  var server = new Server({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function(failCount) {
    done(failCount ? new Error("Failed " + failCount + " tests.") : null);
  });
  server.start();
}

gulp.task('test', ['scripts'], function(done) {
  runTests(true, done);
});

gulp.task('test:auto', ['watch'], function(done) {
  runTests(false, done);
});
