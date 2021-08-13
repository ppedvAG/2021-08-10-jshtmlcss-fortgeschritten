const cacheName = 'v2';
const cacheAssets = [
    '19-js-service-worker-main.html',
    '19-js-service-worker.js',
    '15-html-audio.html'
]

// Es gibt kein Event Register, sondern Install
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            cache.addAll(cacheAssets);
            console.log('Service Worker: Caching Files');            
        })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) { // alles, was dem oben in der Zeile 1 beim cacheName nicht entspricht, wird gelöscht
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})


self.addEventListener('fetch', e => {
    // todo #2
    // in Firefox sieht man diese Meldung. In Edge und Chrome nicht
    console.log('Service Worker: Fetching');
    alert('Service Worker: Fetching');
    e.respondWith(       
        // bei misserfolg lade assets vom cache
        fetch(e.request).catch(() => caches.match(e.request))
    )
})