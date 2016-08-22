
class App {

	constructor(name, cssBuild, jsBuild) {
		this.name = name;
		this.cssBuild = cssBuild;
		this.jsBuild = jsBuild;
		this.makeTasks()
	}

	makeTasks() {
		this.cssTask(this.entryPoint(this.cssBuild.compilerExtension));
		this.jsTask(this.entryPoint(this.jsBuild.compilerExtension));
		this.watchers();
		this.appTask();
	}

	appTask() {
		let appTasks = [this.cssTaskName(), this.jsTaskName()];
		gulp.task(this.appTaskBareName(), appTasks);
		gulp.task(this.appTaskName(), appTasks.concat(AssetPipeline.makeTasks));
	}

	cssTask(entry) {
		gulp.task(this.cssTaskName(), () => {
			return gulp.src(entry)
					.pipe(AssetPipeline.plugins.sourcemaps.init())
					.pipe(this.cssBuild.compile())
					.pipe(AssetPipeline.production ?
						this.cssBuild.minify()
						: AssetPipeline.plugins.util.noop())
					.pipe(AssetPipeline.plugins.sourcemaps.write())
					.pipe(gulp.dest(this.buildDir()))
					.pipe(AssetPipeline.plugins.notify('Styles compiled'));
		});
	}

	jsTask(entry) {
		gulp.task(this.jsTaskName(), () => {
			return gulp.src(entry)
					.pipe(AssetPipeline.plugins.sourcemaps.init())
					.pipe(this.jsBuild.compile())
					.pipe(AssetPipeline.production ?
						this.jsBuild.minify()
						: AssetPipeline.plugins.util.noop())
					.pipe(AssetPipeline.plugins.sourcemaps.write())
					.pipe(gulp.dest(this.buildDir()))
					.pipe(AssetPipeline.plugins.notify('Scripts compiled'));
		});
	}

	watchers() {
		let self = this;
		gulp.task('watch:' + this.name, () => {
			AssetPipeline.plugins.livereload.listen();
			gulp.watch(self.watchPath(self.cssBuild.compilerExtension), self.cssWatchTasks());
			gulp.watch(self.watchPath(self.jsBuild.compilerExtension), self.jsWatchTasks());

		});
	}

	cssWatchTasks() {
		let cssTasks = [this.cssTaskName()];
	}

	jsWatchTasks() {
		let jsTasks = [];
		jsTasks.push(this.jsTaskName());
		if (AssetPipeline.lint) {
			jsTasks.push(AssetPipeline.config.jsLintCommand);
		}
		if (AssetPipeline.test) {
			jsTasks.push(AssetPipeline.config.testCommand);
		}
		if (AssetPipeline.version) {
			jsTasks.push(AssetPipeline.config.versionCommand);
		}
		return jsTasks.concat(AssetPipeline.watchTasks.js);
	}

	appTaskName() {
		return AssetPipeline.config.appRunAllCommand + ':' + this.name;
	}

	appTaskBareName() {
		return AssetPipeline.config.appRunAllCommand + ':' + this.name + ':bare';
	}

	cssTaskName() {
		return AssetPipeline.config.appRunAllCommand + ':' + this.name + ':css';
	}

	jsTaskName() {
		return AssetPipeline.config.appRunAllCommand + ':' + this.name + ':js';
	}

	watchPath(extension) {
		return __dirname + '/../' + AssetPipeline.config.appsDir + '/' + this.name + '/**/*.' + extension;
	}

	entryPoint(extension) {
		return __dirname + '/../' + AssetPipeline.config.appsDir + '/' + this.name + '/' + this.name + '.' + extension;
	}

	buildDir() {
		return './' + AssetPipeline.config.buildDir;
	}

}

export default App;