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
		AssetPipeline.defaultTasks.push(name);
	}
	if (options.watch.include) {
		registerWatchTasks(name, options.watch.type);
	}
	if (options.make.include) {
		AssetPipeline.makeTasks.push(name);
	}
}

function registerWatchTasks(name, type) {
	if (type === 'js') {
		AssetPipeline.watchTasks.js.push(name);
	}
	if (type === 'css') {
		AssetPipeline.watchTasks.css.push(name);
	}
	if (type === 'html') {
		AssetPipeline.watchTasks.html.push(name);
	}
	if (type === 'all') {
		AssetPipeline.watchTasks.js.push(name);
		AssetPipeline.watchTasks.css.push(name);
		AssetPipeline.watchTasks.html.push(name);
	}
}