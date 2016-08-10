AssetPipeline.registerInstruction('minify', function(options) {
	Blueprint.cssBuild.setMinifier('clean-css', AssetPipeline.plugins.cleanCss);
	Blueprint.jsBuild.setMinifier('js', AssetPipeline.plugins.uglify);
});