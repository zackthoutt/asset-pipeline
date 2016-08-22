AssetPipeline.registerCustomTask = function(name, callback, options) {
	gulp.task(name, () => {
		return callback.apply(this, arguments);
	});
	setTaskOptions(name, options);
};

function setTaskOptions(name, options) {
	if (!options) {
		return false;
	}
	if (options.default.include) {
		AssetPipeline.customDefaultTasks.push(name);
	}
	if (options.watch.include) {
		registerWatchTasks(name, options.watch.type);
	}
	if (options.make.include) {
		AssetPipeline.customMakeTasks.push(name);
	}
}

function registerWatchTasks(name, type) {
	if (type === 'js') {
		AssetPipeline.customWatchTasks.js.push(name);
	}
	if (type === 'css') {
		AssetPipeline.customWatchTasks.css.push(name);
	}
	if (type === 'html') {
		AssetPipeline.customWatchTasks.html.push(name);
	}
	if (type === 'all') {
		AssetPipeline.customWatchTasks.js.push(name);
		AssetPipeline.customWatchTasks.css.push(name);
		AssetPipeline.customWatchTasks.html.push(name);
	}
}