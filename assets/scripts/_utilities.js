(function(Utilities) {

	Utilities.normalizeJqueryToDom = function(el) {
		return (typeof jQuery === "function" && el instanceof jQuery) ? el[0] : el;
	};


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

	Utilities.isElInViewport = function (el) {

		el = Utilities.normalizeJqueryToDom(el);

		var top = el.offsetTop,
				left = el.offsetLeft,
				width = el.offsetWidth,
				height = el.offsetHeight;

		while(el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}
		return (
				top < (window.pageYOffset + window.innerHeight) &&
				left < (window.pageXOffset + window.innerWidth) &&
				(top + height) > window.pageYOffset &&
				(left + width) > window.pageXOffset
		);
	};

	Utilities.listener = {
		resize: Utilities.debounce(function () {
			// on resize debounced
			amplify.publish('resize');
		}, 150, false),
		scrollStart: Utilities.debounce(function () {
			// on scroll start either direction debounced
			amplify.publish('scrollStart', $(window).scrollTop());
		}, 300, true),
		scrollEnd: Utilities.debounce(function () {
			// on scroll end debounced
			amplify.publish('scrollEnd', $(window).scrollTop());
		}, 300, false)
	};
	$(window).resize(Utilities.listener.resize);
	$(window).scroll(Utilities.listener.scrollStart);
	$(window).scroll(Utilities.listener.scrollEnd);

}(window.Utilities = window.Utilities || {}));
