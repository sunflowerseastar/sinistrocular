(function ($) {

	var Sinistrocular = {
		'common': {
			init: function () {
				console.log('common.init');

        Utility.header.init();

        Animation.init();
				Video.init();
        Nav.init();

        $(document.links).filter(function() {
          return this.hostname != window.location.hostname;
        }).attr('target', '_blank');
			},
			finalize: function () {
			}
		},
		'page': {
			init: function () {
				console.log('the body has class `page`');
			}
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	var UTIL = {
		fire: function (func, funcname, args) {
			var fire;
			var namespace = Sinistrocular;
			funcname = (funcname === undefined) ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function () {
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			UTIL.fire('common', 'finalize');
		}
	};
	$(document).ready(UTIL.loadEvents);

})(jQuery);
