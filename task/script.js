const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');
const config = require('../gulp.config');
const eslint = require('gulp-eslint');

const TARGET_PATH = config.script_paths.concat(config.ignore_paths);
const OUTPUT_PATH = config.output_path;

gulp.task('script', function() {
    gulp
        .src(TARGET_PATH)
        //生成的文件名能够和原文件对上
        .pipe(named(function(file) {
            var extnameIndex = file.relative.indexOf('.js');
            return file.relative.slice(0, extnameIndex);
        }))
        .pipe(gulpWebpack({
            module: {
                rules: [
                    { test: /\.js$/, loader: 'babel-loader' },
                ],
            }
        }, webpack, function(err, stats) {
            console.log(err)
        }))
        .pipe(gulp.dest(OUTPUT_PATH))
})
