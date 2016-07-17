(function (Utility, $) {
  Utility.header = {
    init: function () {
      console.info('header init');
      this.$body = $('body');
      this.$takeover = $('.takeover');
      this.$header = $('.site-header');
      this.$navbarCollapse = Utility.header.$header.find('.navbar-collapse');


      Utility.header.bindListenersAndSubscriptions();

    },
    bindListenersAndSubscriptions: function () {
      console.log('bindListenersAndSubscriptions');
      amplify.subscribe('scrollUp', Utility.header.onScrollUp);
      amplify.subscribe('scrollDown', Utility.header.onScrollDown);
      amplify.subscribe('menuToggle', Utility.header.menuToggle);

      // Add/remove classname with TB's mobile navbar open/close toggle - used for styling purposes
      Utility.header.$navbarCollapse.on('show.bs.collapse', function () {
        Utility.header.$header.addClass('mobile-nav-open');
      });
      Utility.header.$navbarCollapse.on('hide.bs.collapse', function () {
        Utility.header.$header.removeClass('mobile-nav-open');
      });
    },
    menuToggle: function () {
      //console.log('menuToggle()');
      if (Utility.header.$takeover.hasClass('active')) {
        //console.log('yes active');
      } else {
        //console.log('no not active');
      }
    },
    onScrollUp: function (scroll) {
      console.log('onScrollUp');
      var $header = Utility.header.$header,
          $body = Utility.header.$body;

      if ($header.hasClass('js-is-scrolling-down')) {
        $header.removeClass('js-is-scrolling-down');
      }
    },
    onScrollDown: function (scroll) {
      console.log('onScrollDown');
      var $header = Utility.header.$header,
          $body = Utility.header.$body;

      if (!$header.hasClass('js-is-scrolling-down')) {
        $header.addClass('js-is-scrolling-down');
      }
    }
  };

}(window.Utility = window.Utility || {}, jQuery));
