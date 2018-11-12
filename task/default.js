const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

if (process.env.NODE_ENV === 'production') {
    gulp.task('default', gulpSequence('eslint', 'style', 'build'));
} else {
    gulp.task('default', function() {
        gulp.watch('src/**', function () {
            gulpSequence('eslint', 'style', 'build')(function (err) {
                if (err) console.log(err)
            })
        });
    });
}
