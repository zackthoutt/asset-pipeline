AssetPipeline.registerInstruction = function(name, callback) {
    this.instructions[name] = function() {
        callback.apply(this, arguments);
        return this.instructions;
    }.bind(this);
};