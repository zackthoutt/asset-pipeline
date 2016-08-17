global.gulp = require('gulp');

global.AssetPipeline = blueprint => {
	// 1. load available instructions
	require('require-dir')('./instructions');

	// 2. build gulp task blueprints
	blueprint(AssetPipeline.instructions);

	// 3. create gulp tasks
	Blueprint.createAppTasks();
};

[
    './bootstrap/setProperties',
    './bootstrap/registerInstructions',
    './bootstrap/registerCustomTasks',
]
.forEach(bootstrapper => require(bootstrapper));

module.exports = AssetPipeline;