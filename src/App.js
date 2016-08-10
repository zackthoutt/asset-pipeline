
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
		gulp.task(this.appTaskName(), [this.cssTaskName(), this.jsTaskName()]);
	}

	cssTask(entry) {
		gulp.task(this.cssTaskName(), () => {
			return gulp.src(entry)
					.pipe(AssetPipeline.plugins.sourcemaps.init())
					.pipe(this.cssBuild.compile())
					.pipe(this.cssBuild.minify())
					.pipe(AssetPipeline.plugins.sourcemaps.write())
					.pipe(gulp.dest('./build'))
					.pipe(AssetPipeline.plugins.notify('Styles compiled'));
		});
	}

	jsTask(entry) {
		gulp.task(this.jsTaskName(), () => {
			return gulp.src(entry)
					.pipe(this.jsBuild.compile())
					.pipe(gulp.dest('./build'))
					.pipe(AssetPipeline.plugins.notify('Scripts compiled'));
		});
	}

	watchers() {
		let self = this;
		gulp.task('watch:' + this.name, () => {
			console.log(self.watchPath(self.cssBuild.compilerExtension));
			gulp.watch(self.watchPath(self.cssBuild.compilerExtension), [self.cssTaskName()]);
			gulp.watch(self.watchPath(self.jsBuild.compilerExtension), [self.jsTaskName(), AssetPipeline.config.testCommand]);
		});
	}

	appTaskName() {
		return AssetPipeline.config.appRunAllCommand + ':' + this.name;
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

}

export default App;