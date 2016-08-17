var AssetPipeline = require('./dist/index.js');
const stringify = require('stringify');
var gulp = require('gulp');

AssetPipeline.registerCustomTask('custom-test', function() {
	gulp.src('.')
		.pipe(this.plugins.notify('Custom Test'));
}, {
	'default':{
		'include': true,
	},
	'make': {
		'include': true,
	},
	'watch': {
		'include': false,
	},
})

AssetPipeline(function(recipe) {
	recipe.apps('assets/apps', '/public')
		.sass()
		.minify({
            compatibility: 'ie8',
            processImport: false,
        })
        .browserify({
        	transform: [stringify({extensions: ['.html']})],
        })
		.uglify()
		.version()
		.lint()
		.test();
});