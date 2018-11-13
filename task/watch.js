const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('watch', function() {
    gulp.watch('src/**', function () {
        gulpSequence('eslint', 'style', 'build')(function (err) {
            if (err) console.log(err)
        })
    });
});
