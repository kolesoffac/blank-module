var utils = {};

utils.isError = function(val) {
	return val instanceof Error;
};

utils.printError = function(err, mes, isDontThrow) {
	var error = new Error((mes?(mes + "\n"):"") + err?err.stack:"");

	console.error(error);
	if (!isDontThrow) {
		throw error
	};
};

utils.createErr = function(err, mes) {
	return new Error((mes?(mes + "\n"):"") + err?err.stack:"");
};


export default utils;