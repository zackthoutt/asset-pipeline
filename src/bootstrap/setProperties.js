import Blueprint from '../Blueprint.js';

/**
 * The main Asset Pipeline task blueprint
 * @type {Blueprint}
 */
global.Blueprint = new Blueprint();

/**
 * This object stores the Asset Pipeline tasks.
 * @type {Object}
 */
AssetPipeline.instructions = {};

/**
 * Register the Asset Pipeline config
 * @type {Object}
 */
AssetPipeline.config = require('../config.js');

/**
 * This array stores the custom tasks registered to run with the Gulp Default task
 * @type {Array}
 */
AssetPipeline.customDefaultTasks = [];

/**
 * This array stores the custom tasks registered to run with the Asset Pipeline make:all task
 * @type {Array}
 */
AssetPipeline.customMakeTasks = [];

/**
 * This array stores the custom tasks registered to run in Asset Pipeline watchers
 * @type {Object}
 */
AssetPipeline.customWatchTasks = {
	'js': [],
	'css': [],
	'html': [],
};

/**
 * Load all gulp tasks
 * @type {Object}
 */
AssetPipeline.plugins = require('gulp-load-plugins')();

/**
 * Determines if the app is being run in production
 * @type {Boolean}
 */
AssetPipeline.production = AssetPipeline.plugins.util.env.production ? true : false;

/**
 * Determines if the lint task was registered
 * @type {Boolean}
 */
AssetPipeline.lint = false;

/**
 * Determines if the test task was registered
 * @type {Boolean}
 */
AssetPipeline.test = false;

/**
 * Determines if the version task was registered
 * @type {Boolean}
 */
AssetPipeline.version = false;
