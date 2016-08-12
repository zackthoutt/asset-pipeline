AssetPipeline.registerInstruction('typescript', function() {
	Blueprint.jsBuild.setCompiler('ts', AssetPipeline.plugins.typescript);
});