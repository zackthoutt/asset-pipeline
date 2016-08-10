AssetPipeline.registerInstruction('browserify', function(options) {
	Blueprint.jsBuild.setCompiler('js', AssetPipeline.plugins.browserify);
});