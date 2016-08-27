AssetPipeline.registerInstruction('sass', function(options) {
	Blueprint.cssBuild.setCompiler('scss', options, AssetPipeline.plugins.sass);
});