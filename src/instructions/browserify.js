AssetPipeline.registerInstruction('browserify', function(options) {
	Blueprint.jsBuild.setCompiler('js', options, AssetPipeline.plugins.browserify);
});