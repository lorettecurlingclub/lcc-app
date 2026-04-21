const CACHE_NAME = ‘lcc-app-v1’;
const ASSETS = [
‘/lcc-app/index.html’,
‘/lcc-app/styles.css’,
‘/lcc-app/lcc-logo.png’,
‘/lcc-app/sponsors.jpg’,
‘/lcc-app/mens.html’,
‘/lcc-app/mens-schedule.html’,
‘/lcc-app/mens-standings.html’,
‘/lcc-app/ladies.html’,
‘/lcc-app/mixed.html’,
‘/lcc-app/mixed-schedule.html’,
‘/lcc-app/mixed-standings.html’,
‘/lcc-app/doubles.html’,
‘/lcc-app/wednesday.html’,
‘/lcc-app/saturday.html’,
‘/lcc-app/juniors.html’,
‘/lcc-app/bonspiel.html’,
‘/lcc-app/windup.html’
];

// Install: cache all assets
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
});

// Activate: clean up old caches
self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
)
);
});

// Fetch: serve from cache, fall back to network
self.addEventListener(‘fetch’, event => {
event.respondWith(
caches.match(event.request).then(cached => cached || fetch(event.request))
);
});
