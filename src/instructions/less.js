AssetPipeline.registerInstruction('less', function(options) {
	Blueprint.cssBuild.setCompiler('less', options, AssetPipeline.plugins.less);
});