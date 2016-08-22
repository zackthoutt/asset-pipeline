import blueprint from '../blueprint.js';

AssetPipeline.instructions = {};

AssetPipeline.config = require('../config.js');

AssetPipeline.defaultTasks = [];

AssetPipeline.makeTasks = [];

AssetPipeline.watchTasks = {
	'js': [],
	'css': [],
	'html': [],
};

global.Blueprint = new blueprint();

AssetPipeline.plugins = require('gulp-load-plugins')();

AssetPipeline.production = AssetPipeline.plugins.util.env.production ? true : false;

AssetPipeline.lint = false;

AssetPipeline.test = false;

AssetPipeline.version = false;