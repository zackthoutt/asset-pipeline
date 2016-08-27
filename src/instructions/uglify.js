AssetPipeline.registerInstruction('uglify', function(options) {
	Blueprint.jsBuild.setMinifier(options, AssetPipeline.plugins.uglify);
});