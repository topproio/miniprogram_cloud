const gulp = require('gulp');
const eslint = require('gulp-eslint');

const TARGET_PATH = [
    'src/cloudfunctions/**/*.js',
    'src/miniprogram/app.js',
    'src/miniprogram/pages/**/*.js'
]

gulp.task('eslint', () => {
    gulp.src(TARGET_PATH)
        .pipe(eslint({
            configFile: './.eslintrc.js'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
