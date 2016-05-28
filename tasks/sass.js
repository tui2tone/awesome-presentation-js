var gulp = require("gulp"),
    sass = require("gulp-sass"),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');

gulp.task("sass", function() {
  return gulp.src("src/sass/**/*.sass")
    .pipe(plumber({errorHandler: notify.onError(
      {
        title: "CSS Error: Line <%= error.line %>",
        message: "<%= error.message %>"
      })
    }))
    .pipe(sass().on('error', function(err) { console.log(err) }))
    .pipe(concat('awesome-presentation.css'))
    .pipe(gulp.dest('./bin/css/'))
});