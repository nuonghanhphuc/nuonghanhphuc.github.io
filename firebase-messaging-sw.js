/* Service worker nhận thông báo đẩy (Firebase Cloud Messaging) cho Nướng Hạnh Phúc */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBU4SunLjAjF9gbhX2mEoGEdyb0EJFveZs',
  authDomain: 'nuong-hanh-phuc-hrm.firebaseapp.com',
  projectId: 'nuong-hanh-phuc-hrm',
  storageBucket: 'nuong-hanh-phuc-hrm.firebasestorage.app',
  messagingSenderId: '145162781941',
  appId: '1:145162781941:web:df9dabe9aa3e903ad271bc'
});

firebase.messaging().onBackgroundMessage(function (p) {
  var d = (p && p.data) || {};
  return self.registration.showNotification(d.title || 'Nướng Hạnh Phúc', {
    body: d.body || '', icon: '/icon-192.png', badge: '/icon-192.png',
    tag: d.tag || undefined, renotify: !!d.tag, data: { link: d.link || '/' }
  });
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var link = (e.notification.data && e.notification.data.link) || '/';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf(self.location.origin) === 0 && 'navigate' in list[i]) return list[i].navigate(link).then(function (c) { return c && c.focus(); });
    }
    return self.clients.openWindow(link);
  }));
});
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
