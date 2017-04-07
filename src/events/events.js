function Events(_this) {
	this.self = _this;
};

function recursiveRun(fn, res, type) {
	while (_.isFunction(fn)) {
		fn = fn(res);
	};

	return Promise.resolve().then(function() {
		return fn;
	}).catch(function(err) {
		utils.printError(err, 'Ошибка события(recursiveRun): "' + type + '"; ');
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
		
		promises.push(recursiveRun(self.config.events[onBeforeRun], null, onBeforeRun));
		promises.push(recursiveRun(onBeforePrivateRun, null, "onBeforePrivateRun"));

		return Promise.all(promises);
	}).then(function(res) {
		var promises = [];
		
		promises.push(recursiveRun(onAfterPrivateRun, res[1], "onAfterPrivateRun"));
		promises.push(recursiveRun(self.config.events[onAfterRun], res[1], onAfterRun));

		return Promise.all(promises)
	}).catch(function(err) {
		utils.printError(err, 'Ошибка события(основной): ' + JSON.stringify(opt));
	});
};
//=======================================




export default Events;