/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable  no-multi-assign */
/* eslint-disable  func-names */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  'script',
  'https://connect.facebook.net/en_US/fbevents.js'
);
fbq('init', '642928041160522');
fbq('track', 'PageView');
