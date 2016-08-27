AssetPipeline.registerInstruction('babelify', function(option) {
	Blueprint.jsBuild.setCompiler('js', option, AssetPipeline.plugins.babel);
});