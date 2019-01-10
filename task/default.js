const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

gulp.task('default', gulpSequence('script', 'style', 'build'));
