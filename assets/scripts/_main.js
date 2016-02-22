(function ($) {

	var Main = {
		'common': {
			init: function () {
				console.log('common.init');

				Module.init();

				$('.animation-group').waypoint(function(direction) {
					if (!$(this.element).hasClass('animation-complete')) {
						Main.common.animateInThree($(this.element));
						$(this.element).addClass('animation-complete')
					}
				}, {
					offset: '75%'
				});

				$('.animation-fade-in').waypoint(function(direction) {
					$el = $(this.element);
					if (!$el.hasClass('animation-complete')) {
						$el.velocity({ opacity: 1}, 2500, "easeOutQuart")
								.addClass('animation-complete')
					}
				}, {
					offset: '90%'
				});

				amplify.subscribe('resize', Main.common.resizeExample);
				amplify.subscribe('scrollStart', Main.common.scrollStartExample);


			},
			resizeExample: function() {
				console.log('resizeExample()');
			},
			scrollStartExample: function() {
				console.log('scrollStartExample()');

				$('.video-container').each(function() {
					$this = $(this);
					if (Utilities.isElInViewport($this)) {
						console.log('yes vid is in vp', $this);
					} else {
						console.log('no vid is not in vp', $this);
					}
				})
			},
			animateInThree: function ($this) {
				console.log('animateInThree()', $this);

				$.Velocity.RegisterEffect("upFadeIn", {
					defaultDuration: 5000,
					calls: [
						[{ translateY: -10, opacity: 1 }]
					]
				});

				$animation1 = $this.find('.animation-item-1');
				$animation2 = $this.find('.animation-item-2');
				$animation3 = $this.find('.animation-item-3');

				var loadingSequence = [
					{
						e: $animation1,
						p : "upFadeIn",
						o : { duration: 800 }
					},
					{
						e: $animation2,
						p : "upFadeIn",
						o : { duration: 1100,
							delay: 400,
							sequenceQueue: false }
					},
					{
						e: $animation3,
						p : "upFadeIn",
						o : { duration: 1500,
							delay: 400,
							sequenceQueue: false  }
					}
				];

				$.Velocity.RunSequence(loadingSequence);
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
			var namespace = Main;
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
