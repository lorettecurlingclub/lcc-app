const CACHE_NAME = "lcc-app-v5";

const APP_ROOT = "/lcc-app/";

const ASSETS = [
  "/lcc-app/",
  "/lcc-app/index.html",
  "/lcc-app/styles.css",
  "/lcc-app/manifest.json",

  // Main club images
  "/lcc-app/lcc-logo.png",
  "/lcc-app/lcc-logo-app3.jpg",

  // League logos
  "/lcc-app/lcc-logo-ladies.jpg",
  "/lcc-app/lcc-logo-mens.jpg",
  "/lcc-app/lcc-logo-mixed.jpg",
  "/lcc-app/lcc-logo-doubles.jpg",

  // Sponsor images
  "/lcc-app/sponsors.jpg",
  "/lcc-app/Bronze.jpg",
  "/lcc-app/PlatGold.jpg",
  "/lcc-app/SilvBronze.jpg",
  "/lcc-app/silver.jpg",

  // Ladies League
  "/lcc-app/ladies.html",
  "/lcc-app/ladies-schedule2026.html",
  "/lcc-app/ladies-standings2026.html",
  "/lcc-app/ladies-data2026.js",
  "/lcc-app/ladies-home.js",
  "/lcc-app/ladies-schedule.js",
  "/lcc-app/ladies-standings.js",

  // Mens League
  "/lcc-app/mens.html",
  "/lcc-app/mens-schedule2026.html",
  "/lcc-app/mens-standings2026.html",
  "/lcc-app/mens-data2026.js",
  "/lcc-app/mens-home.js",
  "/lcc-app/mens-schedule.js",
  "/lcc-app/mens-standings.js",

  // Mixed League
  "/lcc-app/mixed.html",
  "/lcc-app/mixed-schedule2026.html",
  "/lcc-app/mixed-standings2026.html",
  "/lcc-app/mixed-data2026.js",
  "/lcc-app/mixed-home.js",
  "/lcc-app/mixed-schedule.js",
  "/lcc-app/mixed-standings.js",

  // Doubles League
  "/lcc-app/doubles.html",
  "/lcc-app/doubles-schedule2026.html",
  "/lcc-app/doubles-standings2026.html",
  "/lcc-app/doubles-data2026.js",
  "/lcc-app/doubles-home.js",
  "/lcc-app/doubles-schedule.js",
  "/lcc-app/doubles-standings.js",

  // Other club pages
  "/lcc-app/wednesday.html",
  "/lcc-app/saturday.html",
  "/lcc-app/Juniors.html",
  "/lcc-app/bonspiel.html",
  "/lcc-app/windup.html",

  // Other page logos
  "/lcc-app/lcc-logo-wednesday.jpg",
  "/lcc-app/lcc-logo-saturday.jpg",
  "/lcc-app/lcc-logo-juniors.jpg",
  "/lcc-app/lcc-logo-bonspiel.jpg",
  "/lcc-app/lcc-logo-windup.jpg"
];

/*
  Install the new cache.

  Each file is cached separately so one missing optional
  file will not prevent the entire service worker from
  installing.
*/

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        ASSETS.map(asset => {
          return cache.add(asset).catch(error => {
            console.warn(
              `Could not cache ${asset}:`,
              error
            );
          });
        })
      );
    })
  );

  self.skipWaiting();
});

/*
  Delete older cache versions and immediately control
  open app pages.
*/

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );

  self.clients.claim();
});

/*
  Only handle normal GET requests from this website.
*/

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const requestURL = new URL(request.url);

  if (requestURL.origin !== self.location.origin) {
    return;
  }

  /*
    HTML pages use network first.

    This ensures newly committed pages appear promptly,
    while still allowing cached pages to work offline.
  */

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseCopy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseCopy);
          });

          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);

          if (cachedPage) {
            return cachedPage;
          }

          return caches.match(
            `${APP_ROOT}index.html`
          );
        })
    );

    return;
  }

  /*
    CSS, JavaScript, JSON and data files also use
    network first so updates are not hidden by an old
    service-worker cache.
  */

  const updateableFile =
    requestURL.pathname.endsWith(".css") ||
    requestURL.pathname.endsWith(".js") ||
    requestURL.pathname.endsWith(".json");

  if (updateableFile) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseCopy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseCopy);
          });

          return response;
        })
        .catch(() => {
          return caches.match(request, {
            ignoreSearch: true
          });
        })
    );

    return;
  }

  /*
    Images and other static files use the cache first,
    then download and save anything not already cached.
  */

  event.respondWith(
    caches.match(request, {
      ignoreSearch: true
    }).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {
        const responseCopy = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseCopy);
        });

        return response;
      });
    })
  );
});
