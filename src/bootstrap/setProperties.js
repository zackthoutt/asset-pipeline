const fs = require('fs');
import blueprint from '../blueprint.js';

AssetPipeline.instructions = {};

AssetPipeline.config = require('../config.js');

AssetPipeline.apps = fs.readdirSync(AssetPipeline.config.appsDir).map(function(app) {
	return app;
});

global.Blueprint = new blueprint();

AssetPipeline.plugins = require('gulp-load-plugins')();

AssetPipeline.production = AssetPipeline.plugins.util.env.production ? true : false;

AssetPipeline.lint = false;

AssetPipeline.test = false;

AssetPipeline.version = false;