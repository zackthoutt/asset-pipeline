import Build from './Build.js';
import App from './App.js';
let Server = require('karma').Server

class blueprint {

	constructor() {
		this.apps = AssetPipeline.apps;
		this.cssBuild = new Build();
		this.jsBuild = new Build();
	}

	createAppTasks() {
		let self = this;
		self.appTasks = [];
		this.apps.map(function(name) {
			let app = new App(name, self.cssBuild, self.jsBuild);
			self.appTasks.push(app.appTaskName());
		});
		this.makeAllTask();
		this.makeDefaultTask();
		this.versionTask();
		this.testTask();
		this.jsLintTask();
	}

	makeAllTask() {
		gulp.task(this.allTaskName(), this.appTasks);
	}

	makeDefaultTask() {
		let defaultTasks = this.appTasks;
		defaultTasks.push('version');
		defaultTasks.concat(AssetPipeline.defaultTasks);
		console.log(defaultTasks);
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
		gulp.task(AssetPipeline.config.jsLintCommand, function() {
		    return gulp.src(__dirname + AssetPipeline.config.appsDir + '/**/*.js')
		        .pipe(AssetPipeline.plugins.jshint())
		        .pipe(AssetPipeline.plugins.jshint.reporter('default'));
		});
	}

	versionTask() {
		gulp.task('version', function() {
			return gulp.src(__dirname + '/../build/**/*')
					.pipe(AssetPipeline.plugins.rev())
				    .pipe(gulp.dest('public'))
				    .pipe(AssetPipeline.plugins.rev.manifest({
				        merge: true,
				    }))
				    .pipe(gulp.dest('.'));
		});
	}

	allTaskName() {
		return AssetPipeline.config.appRunAllCommand + ':all';
	}

}

export default blueprint;