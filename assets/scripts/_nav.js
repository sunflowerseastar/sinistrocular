(function(Nav) {
  Nav.animateInThree = function($this) {};

  Nav.init = function() {
    console.log('Nav.init()');

    if (!$('.js-toggle-mobile-nav').length) {
      return;
    }

    console.log('okay');

    Nav.bindEvents();
  };

  Nav.bindEvents = function() {
    console.log('bindEvents');

    $('.js-toggle-mobile-nav').click(function() {
      console.log('js-toggle-mobile-nav');

      $('.takeover').toggleClass('active');
    });
  };
})((window.Nav = window.Nav || {}));
