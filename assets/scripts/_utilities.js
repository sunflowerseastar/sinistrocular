(function(Utilities) {

	Utilities.debounce = function (func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				func.apply(context, args);
			}
		};
	};

	Utilities.listener = {
		resize: Utilities.debounce(function () {
			// on resize debounced
			amplify.publish('resize');
		}, 150, false),
		scrollStartUpAndDown: Utilities.debounce(function () {
			// on scroll start either direction debounced
			amplify.publish('scrollStart', $(window).scrollTop());
		}, 300, true),
		scrollEnd: Utilities.debounce(function () {
			// on scroll end debounced
			amplify.publish('scrollEnd', $(window).scrollTop());
		}, 300, false)
	};
	$(window).resize(Utilities.listener.resize);
	$(window).scroll(Utilities.listener.scrollStartUpAndDown);
	$(window).scroll(Utilities.listener.scrollEnd);

}(window.Utilities = window.Utilities || {}));
