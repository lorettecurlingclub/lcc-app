const CACHE_NAME = 'lcc-app-v4';
const ASSETS = [
 '/lcc-app/index.html',
 '/lcc-app/styles.css',
 '/lcc-app/lcc-logo.png',
 '/lcc-app/lcc-logo-app3.jpg',
 '/lcc-app/lcc-logo-ladies.jpg',
 '/lcc-app/lcc-logo-mens.jpg',
 '/lcc-app/lcc-logo-mixed.jpg',
 '/lcc-app/lcc-logo-doubles.jpg',
 '/lcc-app/sponsors.jpg',
 '/lcc-app/Bronze.jpg',
 '/lcc-app/PlatGold.jpg',
 '/lcc-app/SilvBronze.jpg',
 '/lcc-app/silver.jpg',
 '/lcc-app/mens.html',
 '/lcc-app/mens-schedule.html',
 '/lcc-app/mens-schedule2026.html',
 '/lcc-app/mens-standings.html',
 '/lcc-app/mens-standings2026.html',
 '/lcc-app/ladies.html',
 '/lcc-app/ladies-schedule2026.html',
 '/lcc-app/ladies-standings2026.html',
 '/lcc-app/mixed.html',
 '/lcc-app/mixed-schedule.html',
 '/lcc-app/mixed-schedule2026.html',
 '/lcc-app/mixed-standings.html',
 '/lcc-app/mixed-standings2026.html',
 '/lcc-app/doubles.html',
 '/lcc-app/doubles-schedule2026.html',
 '/lcc-app/doubles-standings2026.html',
 '/lcc-app/wednesday.html',
 '/lcc-app/saturday.html',
 '/lcc-app/Juniors.html',
 '/lcc-app/bonspiel.html',
 '/lcc-app/windup.html'
 '/lcc-app/lcc-logo-wednesday.jpg',
 '/lcc-app/lcc-logo-saturday.jpg',
 '/lcc-app/lcc-logo-juniors.jpg',
 '/lcc-app/lcc-logo-bonspiel.jpg',
 '/lcc-app/lcc-logo-windup.jpg',
];

self.addEventListener('install', event => {
 event.waitUntil(
   caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
 );
});

self.addEventListener('activate', event => {
 event.waitUntil(
   caches.keys().then(keys =>
     Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
   )
 );
});

self.addEventListener('fetch', event => {
 event.respondWith(
   caches.match(event.request).then(cached => cached || fetch(event.request))
 );
});
