AssetPipeline.registerInstruction('typescript', function(options) {
	Blueprint.jsBuild.setCompiler('ts', options, AssetPipeline.plugins.typescript);
});