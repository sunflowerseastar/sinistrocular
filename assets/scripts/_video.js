(function(Video) {

	var videoHelpers = {
		determineContainer: function ($video) {
			if ($video.css('transform') !== 'none' && $video.closest('.video-container').length) {
				return $video.closest('.video-container');
			} else {
				return $video;
			}
		}
	};

	var videoControllers = {
		playOrPausePerVisibility: function ($container, $video) {
			if (Utilities.isElInViewport($container)) {
				// TODO: make this conditional... only replay a paused video. Don't restart a previously finished video.
				$video[0].play();
			} else {
				$video[0].pause();
			}
		}
	};

	Video.init = function() {
		this.$videos = $('video');
		if (!Video.$videos.length) {
			return;
		}

		Video.$videos.each(function() {
			var $video = $(this);

			amplify.subscribe('scrollStart', function() {
				videoControllers.playOrPausePerVisibility(videoHelpers.determineContainer($video), $video)
			});
			amplify.subscribe('scrollEnd', function() {
				videoControllers.playOrPausePerVisibility(videoHelpers.determineContainer($video), $video)
			});
		});
	};

}(window.Video = window.Video || {}));
