import init from "./other/init";

import events from "./events/events";

import config from "./other/config";
import { version } from "../package.json";

var moduleName = {},
	self;

function ModuleName(options) {
	self = this;
	
	//private object
	self.options = options || {};
	//settings from builder
	self.settings = options && options.settings || {};
	delete self.options.settings;
	self.config = $.extend(true, config, self.options);

	self.events = new events(self);

	return (new init(self)).then(function() {
		return self;
	});
};

function getConfig(prop) {
	return this.config[prop];
};

moduleName.create = function (options) {
	var moduleObj,
		obj = { version: version };

	moduleObj = new ModuleName(options);

	//public object
	return moduleObj.then(function() {
		//public methods
		obj.getConfig = getConfig.bind(self);

		return obj;
	}).catch(function(err) {
		utils.printError(err, 'Ошибка создания объекта ');
	});
};

moduleName.utils = utils;

export default moduleName;