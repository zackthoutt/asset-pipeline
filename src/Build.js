import gutil from 'gulp-util';

class Build {

	constructor() {
		this.compiler = false;
		this.minifier = false;
	}

	setCompiler(extension, callback) {
		this.compilerExtension = extension;
		this.compiler = callback;
	}

	setMinifier(callback) {
		this.minifier = callback;
	}

	compile() {
		if (!this.compiler) {
			return gutil.noop();
		}
		return this.compiler();
	}

	minify() {
		if (!this.minifier) {
			return gutil.noop();
		}
		return this.minifier();
	}

}

export default Build;