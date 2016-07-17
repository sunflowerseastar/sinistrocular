(function(Animation) {

	Animation.animateInThree = function ($this) {
		//console.log('animateInThree()', $this);

		/*

		// unused

		$.Velocity.RegisterEffect("upFadeIn", {
			defaultDuration: 5000,
			calls: [
				[{ translateY: -10, opacity: 1 }]
			]
		});

		*/

		$animation1 = $this.find('.animation-item-1');
		$animation2 = $this.find('.animation-item-2');
		$animation3 = $this.find('.animation-item-3');

		var loadingSequence = [
			{
				e: $animation1,
				p : "fadeIn",
				o : { duration: 800 }
			},
			{
				e: $animation2,
				p : "fadeIn",
				o : { duration: 1100,
					delay: 500,
					sequenceQueue: false }
			},
			{
				e: $animation3,
				p : "fadeIn",
				o : { duration: 1500,
					delay: 800,
					sequenceQueue: false  }
			}
		];

		$.Velocity.RunSequence(loadingSequence);
	};

	Animation.init = function() {
		console.log('Animation.init()');

		$('.animation-group').waypoint(function(direction) {
			if (!$(this.element).hasClass('animation-complete')) {
				Animation.animateInThree($(this.element));
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
	};

}(window.Animation = window.Animation || {}));
