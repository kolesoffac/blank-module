function Events(_this) {
	this.self = _this;
};

function recursiveRun(fn, res, type) {
	var
		self = this.self,
		context = this;
	
	while (_.isFunction(fn)) {
		fn = fn(res);
	};

	return Promise.resolve().then(function() {
		return fn;
	}).catch(function(err) {
		utils.printError(err, 'Ошибка события(recursiveRun): "' + type + '"; ', null, true);
	});
};

Events.prototype.runEvent = function(opt) {
	var
		self = this.self,
		context = this,
		onBeforeRun = opt && opt.onBeforeRun,
		onAfterRun = opt && opt.onAfterRun,
		onAfterPrivateRun = opt && opt.onAfterPrivateRun,
		onBeforePrivateRun = opt && opt.onBeforePrivateRun;

	return Promise.resolve().then(function() {
		var promises = [];
		
		promises.push(recursiveRun.call(context, self.config.events[onBeforeRun], null, onBeforeRun));
		promises.push(recursiveRun.call(context, onBeforePrivateRun, null, "onBeforePrivateRun"));

		return Promise.all(promises);
	}).then(function(res) {
		var promises = [];
		
		promises.push(recursiveRun.call(context, onAfterPrivateRun, res[1], "onAfterPrivateRun"));
		promises.push(recursiveRun.call(context, self.config.events[onAfterRun], res[0], onAfterRun));

		return Promise.all(promises).then(function(args) {
			return args[0]; //return private result
		});
	}).catch(function(err) {
		utils.printError(err, 'Ошибка события(основной): ' + JSON.stringify(opt), null, opt.isDontCatch);
	});
};
//=======================================




export default Events;