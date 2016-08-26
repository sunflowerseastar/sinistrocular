(function(Animation) {

  Animation.animateInTwo = function ($this) {
    console.log('animateintwo()');
    $animation1 = $this.find('[data-animation-item=1]');
    $animation2 = $this.find('[data-animation-item=2]');

    var loadingSequence = [
      {
        e: $animation1,
        p : "fadeIn",
        o : { duration: 850 }
      },
      {
        e: $animation2,
        p : "fadeIn",
        o : { duration: 1400,
          delay: 650,
          sequenceQueue: false }
      }
    ];

    $.Velocity.RunSequence(loadingSequence);
  };

	Animation.animateInThree = function ($this) {
    $animation1 = $this.find('[data-animation-item=1]');
    $animation2 = $this.find('[data-animation-item=2]');
		$animation3 = $this.find('[data-animation-item=3]');

		var loadingSequence = [
			{
				e: $animation1,
				p : "fadeIn",
				o : { duration: 650 }
			},
			{
				e: $animation2,
				p : "fadeIn",
				o : { duration: 900,
					delay: 350,
					sequenceQueue: false }
			},
			{
				e: $animation3,
				p : "fadeIn",
				o : { duration: 2000,
					delay: 400,
					sequenceQueue: false  }
			}
		];

		$.Velocity.RunSequence(loadingSequence);
	};

	Animation.init = function() {
		// console.log('Animation.init()');

		$('.animation-group').waypoint(function(direction) {
      var $el = $(this.element);

			if (!$el.hasClass('animation-complete')) {
        if ($el.data('animation-group') === 2) {
          Animation.animateInTwo($el);
        } else {
          Animation.animateInThree($el);
        }

        $el.addClass('animation-complete')
			}
		}, {
			offset: '75%'
		});

		$('.animation-fade-in').waypoint(function(direction) {
			var $el = $(this.element);

			if (!$el.hasClass('animation-complete')) {
				$el.velocity({ opacity: 1}, 2500, "easeOutQuart")
						.addClass('animation-complete')
			}
		}, {
			offset: '90%'
		});
	};

}(window.Animation = window.Animation || {}));
