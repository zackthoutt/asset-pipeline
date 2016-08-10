AssetPipeline.registerInstruction('less', function(options) {
	Blueprint.cssBuild.setCompiler('less', AssetPipeline.plugins.less);
});