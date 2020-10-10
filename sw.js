const cacheName = 'shake-pwa';
const filesToCache = [
    '/',
    '/shake/index.html',
    '/shake/js/main.js',
    '/shake/component/rotation.js',
    '/shake/manifest.json',
    '/shake/favicon.ico',
    '/shake/images/hello-icon-128.png',
    '/shake/images/hello-icon-144.png',
    '/shake/images/hello-icon-152.png',
    '/shake/images/hello-icon-192.png',
    '/shake/images/hello-icon-256.png',
    '/shake/images/hello-icon-512.png',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
