const CACHE_NAME = 'minha-carteira-v4';
const URLS_TO_CACHE = [
  '/RGdigitalSP/',          // página inicial (ajuste conforme seu repositório)
  '/RGdigitalSP/index.html',
  '/RGdigitalSP/pagina2.html',
  '/RGdigitalSP/pagina3.html',
  '/RGdigitalSP/manifest.json',
  '/RGdigitalSP/icons/icon-192.png',
  '/RGdigitalSP/icons/icon-512.png',
  '/RGdigitalSP/pagina1.jpeg',
  '/RGdigitalSP/pagina2.jpeg',
  '/RGdigitalSP/pagina3.jpeg'
];

// Instala e guarda arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Intercepta requisições e responde com cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza cache quando versão muda
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
