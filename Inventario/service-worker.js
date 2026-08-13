// Este archivo es lo que le permite al navegador "instalar" la página como app.
// Guarda una copia local (caché) de los archivos básicos, así la app abre
// rápido y no queda en blanco si por un instante no hay señal.

const NOMBRE_CACHE = "stock-cache-v1";
const ARCHIVOS_BASICOS = [
  "index.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png"
];

// Se ejecuta una sola vez, cuando el navegador instala la app por primera vez
self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(NOMBRE_CACHE).then((cache) => cache.addAll(ARCHIVOS_BASICOS))
  );
});

// Se ejecuta cada vez que la app pide un archivo (html, ícono, etc):
// si lo tenemos guardado en caché lo devuelve de ahí, si no, lo busca en internet
self.addEventListener("fetch", (evento) => {
  evento.respondWith(
    caches.match(evento.request).then((respuestaCache) => {
      return respuestaCache || fetch(evento.request);
    })
  );
});
