var alchemist = require('./dist/index.js');
const stringify = require('stringify');
var gulp = require('gulp');

alchemist(function(make) {
	make.apps('assets/apps', '/public')
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

/*
	make.apps('/assets/apps')
		.sass() // compile a sass file for each app and put in /build
		.browserify() // compile a js file for each app and put in /build
		.minify() // minify both css and js files and put in /build when in production
		.version() // version all files in /build
		.lint() // lint js in apps dir
		.test() // run tests in apps directory


*/