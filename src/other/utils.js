var utils = {};

utils.replaceAll = function (s, search, replacement) {
	return s.replace(new RegExp(search, 'g'), replacement);
};

utils.isError = function(val) {
	return val instanceof Error;
};

utils.printError = function(err, mes, isDontThrow, isDontConsole) {
	var error = new Error((mes?(mes + "\n"):"") + "\n" + (err && err.message || "")/*+ (err?err.stack:"")*/);

	if (err && err.stack)
		error.stack = err.stack;

	if (!isDontConsole)
		console.error(error);
	if (!isDontThrow) {
		throw error
	};
};

utils.createErr = function(err, mes) {
	return new Error((mes?(mes + "\n"):"") + err?err.stack:"");
};


export default utils;