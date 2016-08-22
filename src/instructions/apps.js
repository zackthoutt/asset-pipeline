const fs = require('fs');

AssetPipeline.registerInstruction('apps', function(appsDir, buildDir, destDir) {
	if (appsDir !== undefined) {
		AssetPipeline.config.appsDir = appsDir;
		AssetPipeline.apps = fs.readdirSync(appsDir).map(function(app) {
			return app;
		});
	}
	if (buildDir !== undefined) {
		AssetPipeline.config.buildDir = buildDir;
	}
	if (destDir !== undefined) {
		AssetPipeline.config.destDir = destDir;
	}
});