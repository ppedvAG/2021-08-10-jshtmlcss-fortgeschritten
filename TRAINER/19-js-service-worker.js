const cacheName = "v1";
const cacheAssets = [
  "19-js-service-worker-main.html",
  "15-html-audio.html",
  "19-js-service-worker-offline.html",
];

// Es gibt kein Event Register, sondern Install
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Service Worker: Caching Files");
      return cache.addAll(cacheAssets);
    })
  );
  self.skipWaiting();
});

// Lösche alle caches, die dem aktuellen cach-Namen nicht entsprechen, beim activate-event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            // alles, was dem oben in der Zeile 1 beim cacheName nicht entspricht, wird gelöscht
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // todo #2

  console.log("Service Worker: Fetching"); // Diese Meldung wird schnell überschrieben, wenn SW bei online neu registriert wird.
  e.respondWith(
    // bei misserfolg lade assets vom cache
    fetch(e.request).
    catch(() => {
      return caches.open(cacheName)
      .then((caches) => {
        // return      caches.match(e.request)
        console.log("e.request :>> ", e.request);
        /*
        Request {
            bodyUsed: false
            cache: "no-cache"
            credentials: "include"
            destination: "document"
            headers: Headers {}
            integrity: ""
            isHistoryNavigation: false
            keepalive: false
            method: "GET"
            mode: "navigate"
            redirect: "manual"
            referrer: "http://127.0.0.1:8887/"
            referrerPolicy: "strict-origin-when-cross-origin"
            signal: AbortSignal {aborted: false, onabort: null}
            url: "http://127.0.0.1:8887/19-js-service-worker-main.html"
        }
        */
        return caches.match("19-js-service-worker-offline.html");
      });
    })
  );
});
