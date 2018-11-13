const gulp = require('gulp');

const OUTPUT_PATH = 'dist';

const TARGET_STATIC_PATH = [
    'src/project.config.json',
    'src/cloudfunctions/**/*',
    'src/miniprogram/app.json',
    'src/miniprogram/app.js',
    'src/miniprogram/**/*',
];

const TARGET_IGNORE_PATH = [
    '!src/miniprogram/app.less',
    '!src/miniprogram/assets/style/*.less',
    '!src/miniprogram/pages/**/*.less',
    '!src/miniprogram/components/**/*.less'
];

const TARGET_PATH = TARGET_STATIC_PATH.concat(TARGET_IGNORE_PATH)

gulp.task('build', function() {
    gulp
        .src(TARGET_PATH, { base: 'src' } )
        .pipe(gulp.dest('dist'));
});
