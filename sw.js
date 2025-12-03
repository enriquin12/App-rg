const CACHE_NAME = 'minha-carteira-v4';
const URLS_TO_CACHE = [
  '/App-rg/',          // página inicial (ajuste conforme seu repositório)
  '/App-rg/index.html',
  '/App-rg/pagina2.html',
  '/App-rg/pagina3.html',
  '/App-rg/manifest.json',
  '/App-rg/icons/icon-192.png',
  '/App-rg/icons/icon-512.png',
  '/App-rg/pagina1.jpeg',
  '/App-rg/pagina2.jpeg',
  '/App-rg/pagina3.jpeg'
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
