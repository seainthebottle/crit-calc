const CACHE_NAME = 'critcalc-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './style.css',
    './app.js',
    './antibiotics.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// 설치 이벤트: 캐시 초기화
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

// 활성화 이벤트: 오래된 캐시 정리
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

// 요청 가로채기: 캐시 우선 전략 (Cache First) + 외부 리소스 캐싱
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // 1. Google Fonts 캐싱 (Stale-While-Revalidate 전략)
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

    // 2. 앱 내부 자원 (Cache First)
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).catch((error) => {
                // 오프라인 상태에서 캐시에 없는 자원 요청 시 에러 처리
                console.log('[Service Worker] Fetch failed:', error);
                // 필요한 경우 오프라인 페이지를 반환하거나 null을 반환하여 브라우저가 기본 에러를 표시하게 함
            });
        })
    );
});
