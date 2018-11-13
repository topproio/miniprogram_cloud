const gulp = require('gulp');
const eslint = require('gulp-eslint');
const TARGET_PATH = [
    'src/cloudfunctions/**/*.js',

    'src/cloudfunctions/api/controllers/*.js',
    'src/cloudfunctions/api/models/*.js',
    'src/cloudfunctions/api/utils/*.js',

    'src/miniprogram/app.js',
    'src/miniprogram/pages/**/*.js',
    'src/miniprogram/utils/*.js',
    'src/miniprogram/components/**/*.js'
]

gulp.task('eslint', () => {
    gulp.src(TARGET_PATH)
        .pipe(eslint({
            configFile: './.eslintrc.js'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
