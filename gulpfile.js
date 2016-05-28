var gulp = require("gulp"),
    requireDir = require('require-dir'),
    tasks = requireDir('./tasks'),
    runSequence = require('run-sequence');
    
gulp.task("js", function(callback) {
  runSequence("compile-js", callback)
});

gulp.task("dev", function(callback) {
  runSequence("js", "watch", callback)
});