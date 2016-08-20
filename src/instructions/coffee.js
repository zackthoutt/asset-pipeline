AssetPipeline.registerInstruction('coffee', function(options) {
	Blueprint.jsBuild.setCompiler('js', options, AssetPipeline.plugins.coffee);
});