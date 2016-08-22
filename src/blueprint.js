import Build from './Build.js';
import App from './App.js';
let Server = require('karma').Server

class Blueprint {

	constructor() {
		this.cssBuild = new Build();
		this.jsBuild = new Build();
	}

	createAppTasks() {
		let self = this;
		self.appTasks = [];
		AssetPipeline.apps.map(function(name) {
			let app = new App(name, self.cssBuild, self.jsBuild);
			self.appTasks.push(app.appTaskBareName());
		});
		this.makeAllTask();
		this.makeDefaultTask();
		this.versionTask();
		this.testTask();
		this.jsLintTask();
	}

	makeAllTask() {
		gulp.task(this.allTaskName(), this.appTasks.concat(AssetPipeline.customMakeTasks));
	}

	makeDefaultTask() {
		let defaultTasks = this.appTasks;
		defaultTasks.push(AssetPipeline.config.versionCommand);
		defaultTasks = defaultTasks.concat(AssetPipeline.customDefaultTasks);
		gulp.task('default', defaultTasks);
	}

	testTask() {
		gulp.task(AssetPipeline.config.testCommand, function(done) {
		    new Server({
		        configFile: __dirname + '/../karma.conf.js',
		        singleRun: true
		    }, done).start();
		});
	}

	jsLintTask() {
		let self = this;
		gulp.task(AssetPipeline.config.jsLintCommand, function() {
		    return gulp.src(self.appsDir())
		        .pipe(AssetPipeline.plugins.jshint())
		        .pipe(AssetPipeline.plugins.jshint.reporter('default'));
		});
	}

	versionTask() {
		let self = this;
		gulp.task('version', function() {
			return gulp.src(self.buildDir())
					.pipe(AssetPipeline.plugins.rev())
				    .pipe(gulp.dest(AssetPipeline.config.destDir))
				    .pipe(AssetPipeline.plugins.rev.manifest({
				        merge: true,
				    }))
				    .pipe(gulp.dest('.'));
		});
	}

	allTaskName() {
		return AssetPipeline.config.appRunAllCommand + ':all';
	}

	appsDir() {
		return __dirname + '/../' + AssetPipeline.config.appsDir + '/**/*.js';
	}

	buildDir() {
		return __dirname + '/../' + AssetPipeline.config.buildDir + '/**/*';
	}

}

export default Blueprint;