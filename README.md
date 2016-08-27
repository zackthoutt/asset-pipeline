# Asset Pipeline (*_Prototype_)
My biggest complaint about Gulp is that you have to constantly edit you gulpfile.js as you add files, applications, pages, etc., and most of the time you just copy and paste a configuration for a previous page/app. My first inspiration for this prototype was to experiment with creating a Gulp wrapper that would significantly reduce editing Gulp configurations for a repository.

The other thing that bothers me about Gulp is that most of the time you will either end up with a huge gulpfile.js with a lot of tasks, or you will constantly recompile all of your assets when only a few were altered. My second inspiration for this prototype was to add functionality to only watch and compile certain apps/pages. 

### File layout
When I build JavaScript applications, I like to group my files by application and component within the application; organizing files in folders by type (js, scss, ts, html, etc.) makes figuring out what files work together on a page more difficult. Here is how I might layout my assets in a repository:
```
-assets
---shared
-----module1
-----module2
---apps
-----app1
-------app1.js
-------app1.scss
-------app1.module.js
-----app2
-------app1.js
-------app1.scss
-------app1.module.js
```

In app1, the entry to the JavaScript application is in `assets/apps/app1/app1.js` and the entry to the styling for the application is in `assets/apps/app1/app1.scss`. 

### The idea
Let's imagine that I have already created `app1` above, but I'm just starting work on `app2`. I would normally probably end up copying and pasting a lot of the Gulp config for `app1` and recreating it with the file paths for `app2`. Here's how you would do it using the Asset Pipeline.
```
# In your gulpfile.js

var AssetPipeline = require('./dist/index.js');
var gulp = require('gulp');

AssetPipeline(function(recipe) {
	recipe.apps('assets/apps', 'build', 'public')
		.sass()
		.minify()
        .browserify()
		.uglify()
		.version()
		.lint()
		.test();
});
```
Now, every time you add an app/page the AssetPipeline will automatically pick it up and use the same recipe as previously defined. I have created wrappers on many common gulp tasks (less, sass, browserify, uglify, jshint, rev, karma/jasmine, etc.) and you can simply include them in the chain and the Asset Pipeline will apply them to every app/page that you create.

### How it works
The Asset Pipeline assumes that for each "app" in the `assets/apps` directory that there is a corresponding "app.js" and "app.{scss|css|less...}" file that act as the entry points into the application. The Asset Pipeline can use these entry points to build gulp tasks that are executable on the command line.

### What tasks are available?
For this explaination let's assume that were are working with the Asset Pipeline configuration and file layout defined above.

For this configuration there will be five tasks that will affect all apps in the `assets/apps` folder: 
1. `gulp` and `gulp make:all` will run everything for `app1` and `app2`
2. `gulp test` will run karma-jasmine tests for `app1` and `app2`
3. `gulp lint` will lint JavaScript files for `app1` and `app2`
4. `gulp version` will add a hash to each of the files in `build` and put them in `public`. 

The Asset Pipeline also provides a few tasks for each app that make development a little quicker. For any app, `app1`, there will be: 
1. `gulp make:app1` task that runs everything for `app1`
2. `gulp make:app1:css` that runs all styling tasks for `app1`
3. `gulp make:app1:js` that runs all JavaScript tasks for `app1`
4. `gulp watch:app1` that bootstraps watchers for the files in `app1` that also trigger versioning, testing, linting, etc. when appropriate.
5. 
### Customization
Having all of those tasks right out of the box for any appilcation seems nice, but it is a pretty opinionated solution. There are two features I have added to help make the Asset Pipeline usable in more situations:
1. You can add custom tasks that
    - Can be executed on the command line
    - Can be added to the app watchers
    - Can be added to the make commands
2. You can pass options to the gulp task wrappers (i.e. define a transform for browserify.
3. You can mix and match gulp tasks for your Asset Pipeline recipe

### Custom tasks
Here is what defining a custom task might look like:
```
AssetPipeline.registerCustomTask('custom-test', function() {
	gulp.src('.')
		.pipe(this.plugins.notify('Custom Test'));
}, {
	'default':{
		'include': true,
	},
	'make': {
		'include': true,
	},
	'watch': {
		'include': true,
		'type': 'all',
	},
})
```
This custom task would run when `gulp` runs, when any `gulp make:` task runs, or when a watcher of any file for any app is triggered.

### Task options
Here is what adding options for browserfiy would look like:
```
AssetPipeline(function(recipe) {
	recipe.apps('assets/apps', 'build', 'public')
		.sass()
		.minify({
            compatibility: 'ie8',
            processImport: false,
        })
        .browserify({
        	transform: [stringify({extensions: ['.html']})],
        })
		.uglify()
		.version()
		.lint()
		.test();
});
```
This task would run the stringify transform on all `html` files.

### Asset Pipeline recipes
In all of the examples above I have used `sass`, but you could just as easily use `less`:
```
AssetPipeline(function(recipe) {
	recipe.apps('assets/apps', 'build', 'public')
		.less()
		.minify()
        .browserify()
		.uglify()
		.version()
		.lint()
		.test();
});
```
Or not include versioning, minification, or uglification and use typescript:
```
AssetPipeline(function(recipe) {
	recipe.apps('assets/apps', 'build', 'public')
		.sass()
        .typescript()
		.lint()
		.test();
});
```
For a full list of tasks that you can add to your recipes check out the `src/instructions` directory.

# Closing thoughts
While this Asset Pipeline works, it is not currently intended to be used. I created this project as an experiment and have not yet decided if I will expand on this tool to make it more robust. 
