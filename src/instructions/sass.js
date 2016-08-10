AssetPipeline.registerInstruction('sass', function(options) {
	Blueprint.cssBuild.setCompiler('scss', AssetPipeline.plugins.sass);
});