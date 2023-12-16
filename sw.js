const CACHE_NAME = 'todo-pwa-v1'

const urlsToCache = [
    '/',
    '/index.html',
    '/assets/app.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    '/assets/images/icon-192x192.png',
    '/assets/images//icon-512x512.png'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(() => {
                return caches.match('/index.html')
            })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName)
                })
            )
        })
    )
})

self.addEventListener('beforeinstallprompt', event => {
    event.preventDefault()
    const installPrompt = confirm('Deseja instalar o aplicativo To-Do List?')
    if (installPrompt) {
        event.prompt()
    }
})