const cacheName = "DefaultCompany-mario_project-1.0";
const contentToCache = [
    "Build/CJWebPage.loader.js",
    "Build/e9620a8614f8fbc755015177dc9e70b7.js",
    "Build/1f5b92388609be53b8cebeffb80a8211.data",
    "Build/c8bbe91ffa55954e132d6bb0e5040d98.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
