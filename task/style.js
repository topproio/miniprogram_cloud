const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const config = require('../gulp.config');

const TARGET_PATH = config.style_paths;
const OUTPUT_PATH = config.output_path;

gulp.task('style', function() {
    gulp
        .src(TARGET_PATH, { base: config.target_path })
        .pipe(less())
        .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
        .pipe(
            cssnano({
                zindex: false, //不计算zinde值
                autoprefixer: false, //不删除前缀
                discardComments: { removeAll: true } //移除注释
            })
        )
        .pipe(
            rename(function(path) {
                path.extname = '.wxss';
            })
        )
        .pipe(gulp.dest(OUTPUT_PATH));
});
