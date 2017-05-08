var purify = require('gulp-purifycss');
var gulp = require('gulp');

gulp.task('default', function () {
    return gulp.src('./server/static/assets/stylesheets/main.css')
        .pipe(purify(['./server/static/assets/js/*.js', './server/static/*.html']))
        .pipe(gulp.dest('./server/static/assets/stylesheets/slim.css'));
});
