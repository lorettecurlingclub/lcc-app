const CACHE_NAME = 'lcc-app-v2';
const ASSETS = [
  '/lcc-app/index.html',
  '/lcc-app/styles.css',
  '/lcc-app/lcc-logo.png',
  '/lcc-app/lcc-logo-app3.jpg',
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
];

// Install: cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});