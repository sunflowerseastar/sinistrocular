const isInViewport = el => {
  let top = el.offsetTop,
    left = el.offsetLeft,
    width = el.offsetWidth,
    height = el.offsetHeight;

  if (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
};

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const fadeInIfInViewport = els => {
  els.forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('in');
    }
  });
};

document.addEventListener('readystatechange', event => {
  let elsToFadeIn = document.querySelectorAll('.js-fade-in');

  if (event.target.readyState === 'interactive') {
    // mobile nav
    document.querySelectorAll('.js-toggle-mobile-nav').forEach(el => {
      el.onclick = () => {
        document.querySelector('.takeover').classList.toggle('active');
      };
    });

    // ongoing fade-ins
    elsToFadeIn = document.querySelectorAll('.js-fade-in');
    window.addEventListener(
      'scroll',
      throttle(() => fadeInIfInViewport(elsToFadeIn), 200)
    );
    window.addEventListener(
      'scroll',
      debounce(() => fadeInIfInViewport(elsToFadeIn), 300)
    );
    window.onresize = debounce(() => fadeInIfInViewport(elsToFadeIn), 350);
  }

  if (event.target.readyState === 'complete') {
    document.querySelector('.js-body-fade-in').classList.add('complete');

    // initial fade-ins
    fadeInIfInViewport(elsToFadeIn);
  }
});
