
function Init(_this) {

	this.self = _this;

	return initialized.call(this);
};

function created() {
	var
		self = this.self,
		context = this;
	
	return self.events.runEvent({
			onBeforeRun: "onBeforeCreate",
			onAfterRun: "onAfterCreate",
			onBeforePrivateRun: function() {

			},
			onAfterPrivateRun: function(res) {

			}
		});
};

function initialized() {
	var self = this.self,
		context = this;

	return self.events.runEvent({
		onBeforeRun: "onBeforeInit",
		onAfterRun: "onAfterInit",
		onBeforePrivateRun: function() {

		},
		onAfterPrivateRun: function(res) {
			return created.call(context);
		}
	});
};




export default Init;