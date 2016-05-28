var gulp = require("gulp"),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    notify = require("gulp-notify"),
    plumber = require('gulp-plumber');

gulp.task("compile-js", function() {
  return browserify('./src/main.js', { fast: true, 'insert-globals': true })
    .transform("babelify", { 
      presets: [
        "es2015-script",
        "stage-0"
      ]
    })
    .bundle()
    .pipe(plumber({errorHandler: notify.onError(
      {
        title: "JS Error: Line <%= error.line %>",
        message: "<%= error.message %>"
      })
    }))
    .pipe(source('app.js'))
    .pipe(gulp.dest('./bin/js'))
});
