AssetPipeline.registerInstruction('browserify', function() {
	Blueprint.jsBuild.setCompiler('js', AssetPipeline.plugins.browserify);
});