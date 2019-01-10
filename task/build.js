const gulp = require('gulp');
const config = require('../gulp.config');

const TARGET_STATIC_PATH = config.static_paths;
const TARGET_IGNORE_PATH = config.style_paths.concat(config.script_paths).map(name => '!' + name);

const TARGET_PATH = TARGET_STATIC_PATH.concat(TARGET_IGNORE_PATH);
const OUTPUT_PATH = config.output_path;


gulp.task('build', function() {
    gulp
        .src(TARGET_PATH, { base: config.target_path } )
        .pipe(gulp.dest(OUTPUT_PATH));
});
