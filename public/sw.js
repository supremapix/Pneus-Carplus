self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // Force unregister itself
      return self.registration.unregister();
    })
  );
});

// Pass-through fetch handler so nothing is intercepted or cached
self.addEventListener('fetch', (event) => {
  // Let everything pass through to the network
  return;
});

