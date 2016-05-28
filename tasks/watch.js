var gulp = require("gulp")

gulp.task("watch", function() {
  gulp.watch(['./src/**/*.js'], ['js']);
  gulp.watch(['./src/**/*.sass'], ['sass']);
})