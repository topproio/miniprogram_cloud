const GULP_CONFIG = {
	// 输出目录
	output_path: 'dist',
	// 开发目录
	target_path: 'src',
	// 样式文件
	style_paths: [
		'src/app.less',
		'src/**/*.less'
	],
	// 脚本目录
	script_paths: [
		'src/**/*.js'
	],
	// 拷贝资源目录
	static_paths: [
		'src/**'
	],
	// 忽略目录
	ignore_paths: [
		'!node_modules/**'
	],
	eslint_path: './.eslintrc.js'
}

module.exports = GULP_CONFIG;