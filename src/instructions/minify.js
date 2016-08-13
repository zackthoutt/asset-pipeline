AssetPipeline.registerInstruction('minify', function(cssOptions, jsOptions) {
	Blueprint.cssBuild.setMinifier(cssOptions, AssetPipeline.plugins.cleanCss);
	Blueprint.jsBuild.setMinifier(jsOptions, AssetPipeline.plugins.uglify);
});