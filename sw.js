const CACHE_NAME = 'zion-appliance-v21';
const OFFLINE_PAGE = '/index.html';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/styles.min.css?v=57',
  '/assets/main.min.js?v=32',
  '/favicon.svg',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/browserconfig.xml',
  '/assets/og-image.png',
  '/assets/logo-192.png',
  '/assets/logo-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error('[Service Worker] Install error:', error);
        throw error;
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          }).catch((error) => {
            console.warn('[Service Worker] Cache update failed:', error);
          });
        }
        return response;
      }).catch((error) => {
        console.warn('[Service Worker] Fetch failed for:', event.request.url, error);
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    }).catch((error) => {
      console.error('[Service Worker] Cache match error:', error);
      if (event.request.destination === 'document') {
        return caches.match(OFFLINE_PAGE) || new Response(
          'Network error. Please try again later.',
          { status: 503, statusText: 'Service Unavailable' }
        );
      }
      return new Response(null, { status: 404 });
    })
  );
});