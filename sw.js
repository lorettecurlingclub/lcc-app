const CACHE_NAME = "lcc-app-v6";

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
  Install the newest offline cache.

  Every file is handled separately so one missing optional
  file cannot prevent the service worker from installing.
*/

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(
        ASSETS.map(async asset => {
          try {
            /*
              cache: "reload" makes sure installation asks
              for the newest published copy instead of using
              an older browser HTTP cache.
            */
            const response = await fetch(asset, {
              cache: "reload"
            });

            if (!response.ok) {
              throw new Error(
                `HTTP ${response.status}`
              );
            }

            await cache.put(
              asset,
              response.clone()
            );
          } catch (error) {
            console.warn(
              `Could not cache ${asset}:`,
              error
            );
          }
        })
      );
    })
  );

  self.skipWaiting();
});

/*
  Remove all previous LCC caches and immediately take
  control of open app pages.
*/

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith("lcc-app-") &&
              cacheName !== CACHE_NAME
            );
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );

  self.clients.claim();
});

/*
  Handle only normal GET requests from the LCC site.
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
    PAGE NAVIGATION

    Try the newest online page first.

    If there is no internet connection, return the cached
    version. If that page has somehow never been cached,
    return the cached app home page.
  */

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseCopy =
              response.clone();

            caches
              .open(CACHE_NAME)
              .then(cache => {
                cache.put(
                  request,
                  responseCopy
                );
              });
          }

          return response;
        })
        .catch(async () => {
          const cachedPage =
            await caches.match(
              request,
              {
                ignoreSearch: true
              }
            );

          if (cachedPage) {
            return cachedPage;
          }

          return caches.match(
            `${APP_ROOT}index.html`,
            {
              ignoreSearch: true
            }
          );
        })
    );

    return;
  }

  /*
    CSS, JAVASCRIPT AND JSON

    Network first keeps schedules, standings and styling
    current whenever internet is available.

    In airplane mode, the cached versions are used.
  */

  const updateableFile =
    requestURL.pathname.endsWith(".css") ||
    requestURL.pathname.endsWith(".js") ||
    requestURL.pathname.endsWith(".json");

  if (updateableFile) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseCopy =
              response.clone();

            caches
              .open(CACHE_NAME)
              .then(cache => {
                cache.put(
                  request,
                  responseCopy
                );
              });
          }

          return response;
        })
        .catch(() => {
          return caches.match(
            request,
            {
              ignoreSearch: true
            }
          );
        })
    );

    return;
  }

  /*
    IMAGES AND OTHER STATIC FILES

    Use the cached copy immediately.

    If it is not cached yet, download it and save it for
    future offline use.
  */

  event.respondWith(
    caches.match(
      request,
      {
        ignoreSearch: true
      }
    ).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {
        if (response.ok) {
          const responseCopy =
            response.clone();

          caches
            .open(CACHE_NAME)
            .then(cache => {
              cache.put(
                request,
                responseCopy
              );
            });
        }

        return response;
      });
    })
  );
});