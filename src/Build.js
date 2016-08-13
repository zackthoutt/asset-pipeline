import gutil from 'gulp-util';

class Build {

	constructor() {
		this.compiler = false;
		this.minifier = false;
	}

	setCompiler(extension, options, callback) {
		this.compilerExtension = extension;
		this.compilerOptions = options;
		this.compiler = callback;
	}

	setMinifier(options, callback) {
		this.minifier = callback;
		this.minifierOptions = options;
	}

	compile() {
		if (!this.compiler) {
			return gutil.noop();
		}
		return this.compiler(this.compilerOptions);
	}

	minify() {
		if (!this.minifier) {
			return gutil.noop();
		}
		return this.minifier(this.minifierOptions);
	}

}

export default Build;