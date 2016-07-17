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
      amplify.publish('resize', Utilities.mq().which());
    }, 150, false),
    scrollStartUpAndDown: Utilities.debounce(function () {
      amplify.publish('scrollStart', $(window).scrollTop());
    }, 300, true),
    scrollEnd: Utilities.debounce(function () {
      amplify.publish('scrollEnd', $(window).scrollTop());
      _UtilitiesLastScrollTopDebounced = $(window).scrollTop();
    }, 300, false)
  };
  $(window).resize(Utilities.listener.resize);

  $(window).scroll(Utilities.listener.scrollStart);
  $(window).scroll(Utilities.listener.scrollEnd);

  var _UtilitiesLastScrollTop = 0;
  $(window).scroll(function() {
    if ($(window).scrollTop() > _UtilitiesLastScrollTop) {
      amplify.publish('scrollDown', $(window).scrollTop());
    } else {
      amplify.publish('scrollUp', $(window).scrollTop());
    }
    _UtilitiesLastScrollTop = $(window).scrollTop();
  });

}(window.Utilities = window.Utilities || {}));
