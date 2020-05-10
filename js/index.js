document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    document.querySelector('.on-ready').classList.add('complete');
  }
  document.querySelectorAll('.js-toggle-mobile-nav').forEach(el => {
    el.onclick = () => {
      console.log('on click');
      document.querySelector('.takeover').classList.toggle('active');
    };
  });
});
