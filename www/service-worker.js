const CACHE_NAME = 'critcalc-v3.31';
const ASSETS_TO_CACHE = [
    './index.html',
    './style.css?v=3.31',
    './app.js?v=3.31',
    './antibiotics.js?v=3.31',
    './manifest.json?v=3.31',
    './icon-192.png',
    './icon-512.png'
];

// Install event: Initialize cache
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Install');
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');
    // Tell the active service worker to take control of the page immediately.
    event.waitUntil(
        clients.claim().then(() => {
            return caches.keys().then((keyList) => {
                return Promise.all(
                    keyList.map((key) => {
                        if (key !== CACHE_NAME) {
                            console.log('[Service Worker] Removing old cache', key);
                            return caches.delete(key);
                        }
                    })
                );
            });
        })
    );
});

// Fetch event: Cache First strategy + External resource caching
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // 1. Google Fonts caching (Stale-While-Revalidate strategy)
    if (requestUrl.origin.includes('fonts.googleapis.com') || requestUrl.origin.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((response) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });
            })
        );
        return;
    }

    // 2. App internal resources (Cache First)
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).catch((error) => {
                // Handle errors when resource is not in cache and offline
                console.log('[Service Worker] Fetch failed:', error);
                // Return offline page or null to let browser show default error
            });
        })
    );
});
