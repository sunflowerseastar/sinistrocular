document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    document.querySelector('body').classList.add('complete');
  }
  document.querySelectorAll('.js-toggle-mobile-nav').forEach(el => {
    el.onclick = () => {
      document.querySelector('.takeover').classList.toggle('active');
    };
  });
});
