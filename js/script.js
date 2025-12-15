/** @format */

(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === 'childList')
        for (const c of t.addedNodes)
          c.tagName === 'LINK' && c.rel === 'modulepreload' && r(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (t.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (t.credentials = 'omit')
        : (t.credentials = 'same-origin'),
      t
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = s(e);
    fetch(e.href, t);
  }
})();

const toggleBtn = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('#nav-links');
const closeBtn = document.querySelector('.close-menu');

toggleBtn.addEventListener('click', function () {
  navLinks.classList.toggle('active');
  toggleBtn.style.display = 'none';
  closeBtn.style.display = 'inline-block';

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      toggleBtn.style.display = 'none';
    } else {
      closeBtn.style.display = 'inline-block';
    }
  });
});

closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('active');
  toggleBtn.style.display = 'inline-block';
  closeBtn.style.display = 'none';

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      window.location.reload();
    }
  });
});

const i = document.getElementById('form'),
  n = document.getElementById('result');
i.addEventListener('submit', function (l) {
  l.preventDefault();
  const o = new FormData(i),
    s = Object.fromEntries(o),
    r = JSON.stringify(s);
  (n.innerHTML = 'Please wait...'),
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: r,
    })
      .then(async (e) => {
        let t = await e.json();
        e.status == 200
          ? (n.innerHTML = 'Form submitted successfully')
          : (console.log(e), (n.innerHTML = t.message));
      })
      .catch((e) => {
        console.log(e), (n.innerHTML = 'Something went wrong!');
      })
      .then(function () {
        i.reset(),
          setTimeout(() => {
            n.style.display = 'none';
          }, 3e3);
      });
});
