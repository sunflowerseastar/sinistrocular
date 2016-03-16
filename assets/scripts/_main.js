(function ($) {

	var Sinistrocular = {
		'common': {
			init: function () {
				console.log('common.init');

				Animation.init();


				amplify.subscribe('resize', Sinistrocular.common.resizeExample);
				amplify.subscribe('scrollStart', Sinistrocular.common.playAndPauseAllVideosAppropriately);
				amplify.subscribe('scrollEnd', Sinistrocular.common.playAndPauseAllVideosAppropriately);




			},

			playAndPauseAllVideosAppropriately: function() {
				//console.log('playAndPauseAllVideosAppropriately()');

				$('video').each(function() {
					$this = $(this);
					if (Utilities.isElInViewport($this)) {
						//console.log('yes vid is in vp', $this);

						// TODO: make this conditional... only replay a paused video. Don't restart a previously finished video.
						$this[0].play();
					} else {
						//console.log('no vid is not in vp', $this);
						$this[0].pause();
					}
				})

			},
			resizeExample: function() {
				console.log('resizeExample()');
			},
			scrollStartExample: function() {
				console.log('scrollStartExample()');






				var $headerVideo = $('#header_video');

				var $test = $('.test-el');


				if (Utilities.isElInViewport($test)) {
					console.log('Utilities.isElInViewport($test)', $test);

				} else {
					console.log('no', $test);
				}









				/*$('video').each(function() {
					$this = $(this);
					if (Utilities.isElInViewport($this)) {
						console.log('yes vid is in vp', $this);

						//$this[0].pause();
						$this[0].play();
					} else {
						console.log('no vid is not in vp', $this);
						$this[0].pause();
					}
				})*/
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
