(function(Module) {

	var customModule = {
		method1: function() {
			customModule.method2();
		},
		method2: function() {
			console.log('customModule method2()');
		}
	};

	Module.init = function() {
		customModule.method1();
	}
}(window.Module = window.Module || {}));
