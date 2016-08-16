
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
					.pipe(AssetPipeline.production ?
						this.cssBuild.minify()
						: AssetPipeline.plugins.util.noop())
					.pipe(AssetPipeline.plugins.sourcemaps.write())
					.pipe(gulp.dest('./build'))
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
					.pipe(gulp.dest('./build'))
					.pipe(AssetPipeline.plugins.notify('Scripts compiled'));
		});
	}

	watchers() {
		let self = this;
		let jsTasks = [];
		let cssTasks = [];
		jsTasks.push(self.jsTaskName());
		if (AssetPipeline.lint) {
			jsTasks.push(AssetPipeline.config.jsLintCommand);
		}
		if (AssetPipeline.test) {
			jsTasks.push(AssetPipeline.config.testCommand);
		}
		jsTasks.push('version');
		cssTasks.push(self.cssTaskName());
		console.log(AssetPipeline.plugins);
		gulp.task('watch:' + this.name, () => {
			AssetPipeline.plugins.livereload.listen();
			gulp.watch(self.watchPath(self.cssBuild.compilerExtension), cssTasks);
			gulp.watch(self.watchPath(self.jsBuild.compilerExtension), jsTasks);
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