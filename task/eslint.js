const gulp = require('gulp');
const config = require('../gulp.config');
const eslint = require('gulp-eslint');

const TARGET_PATH = config.script_paths.concat(config.ignore_paths)
const configFile = config.eslint_path;

gulp.task('eslint', () => {
    gulp.src(TARGET_PATH)
        .pipe(eslint({ configFile }))
        .pipe(eslint.format());
});
