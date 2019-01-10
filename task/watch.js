const gulp = require('gulp');
const config = require('../gulp.config');
const gulpSequence = require('gulp-sequence');

gulp.task('watch', function() {
    gulp.watch(config.target_path + '/**', function () {
        gulpSequence('script', 'style', 'build')(function (err) {
            if (err) console.log(err)
        })
    });
});
