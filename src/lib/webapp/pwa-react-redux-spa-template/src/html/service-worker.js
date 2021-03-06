
console.log('Script loaded!');

var cacheStorageKey = 'pwa-www';

var cacheList = [
    '/www/',
    '/www/index.html',
    '/www/manifest.json',
    '/www/css/style.css',
    '/www/libs/react.react-dom.min.js',
    '/www/libs/moment.min.js',
    '/www/libs/axios.min.js',
    '/www/js/common.js',
    '/www/js/index.js',
    '/www/libs/react-redux.min.js',
    '/www/libs/redux.min.js'
];


self.addEventListener('install', function (e) {
    console.log('Cache event!');
    e.waitUntil(
        caches.open(cacheStorageKey).then(function (cache) {
            console.log('Adding to Cache:', cacheList);
            return cache.addAll(cacheList);
        }).then(function () {
            console.log('Skip waiting!');
            return self.skipWaiting();
        })
    )
});

self.addEventListener('activate', function (e) {
    console.log('Activate event');
    e.waitUntil(
        Promise.all([
            caches.keys().then(cacheNames => {
                return cacheNames.map(name => {
                    if (name !== cacheStorageKey) {
                        return caches.delete(name);
                    }
                })
            })]
        ).then(() => {
            console.log('Clients claims.');
            return self.clients.claim();
        })
    )
});

self.addEventListener('fetch', function (e) {
    console.log('Fetch event:', e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response != null) {
                console.log('Using cache for:', e.request.url);
                return response;
            }
            console.log('Fallback to fetch:', e.request.url);
            return fetch(e.request.url);
        })
    )
});