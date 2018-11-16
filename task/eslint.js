const gulp = require('gulp');
const eslint = require('gulp-eslint');
const TARGET_PATH = [
    'src/miniprogram/**/*.js',
    'src/cloudfunctions/**/*.js',
    '!node_modules/**'
]

gulp.task('eslint', () => {
    gulp.src(TARGET_PATH)
        .pipe(eslint({
            configFile: './.eslintrc.js'
        }))
        .pipe(eslint.format());
});
