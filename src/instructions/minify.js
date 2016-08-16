AssetPipeline.registerInstruction('minify', function(options) {
	Blueprint.cssBuild.setMinifier(options, AssetPipeline.plugins.cleanCss);
});