// Service Worker for Astronomy News PWA
const CACHE_NAME = 'astronomy-news-v1.3';
const OFFLINE_URL = '/offline.html';
const STATIC_CACHE = 'static-v13';
const DYNAMIC_CACHE = 'dynamic-v13';

// Assets to cache on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/main.css',
    '/manifest.json',
    '/data.js',
    '/data_processing.js',
    '/translation.js',
    '/app.js',
    '/router.js',
    '/share-manager.js',
    '/pwa-main.js',
    '/AN_about.html',
    '/AN_explore.html',
    '/AN_news.html',
    '/AN_gallery.html',
    '/AN_missions.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Icons to cache
const ICONS = [
    '/assets/icons/icon-72x72.png',
    '/assets/icons/icon-96x96.png',
    '/assets/icons/icon-128x128.png',
    '/assets/icons/icon-152x152.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-384x384.png',
    '/assets/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Handle API requests differently
    if (event.request.url.includes('supabase.co')) {
        event.respondWith(networkFirstStrategy(event.request));
        return;
    }
    
    // For navigation requests, try network first
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_URL))
        );
        return;
    }
    
    // For static assets, try cache first
    if (STATIC_ASSETS.some(asset => event.request.url.includes(asset)) ||
        ICONS.some(icon => event.request.url.includes(icon))) {
        event.respondWith(cacheFirstStrategy(event.request));
        return;
    }
    
    // For other requests, try network first
    event.respondWith(networkFirstStrategy(event.request));
});

// Cache First Strategy
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        // Cache the response for future use
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // If both cache and network fail, return offline page for HTML requests
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match(OFFLINE_URL);
        }
        throw error;
    }
}

// Network First Strategy
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If it's an HTML request, return offline page
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match(OFFLINE_URL);
        }
        
        throw error;
    }
}

// Background Sync for offline interactions
self.addEventListener('sync', event => {
    if (event.tag === 'sync-reactions') {
        event.waitUntil(syncReactions());
    }
    if (event.tag === 'sync-comments') {
        event.waitUntil(syncComments());
    }
});

// Sync reactions to server
async function syncReactions() {
    const db = await openReactionsDB();
    const reactions = await getAllReactions(db);
    
    for (const reaction of reactions) {
        try {
            // Sync to Supabase
            await fetch('https://cmicjfgettavzilduqgq.supabase.co/rest/v1/reactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWNqZmdldHRhdnppbGR1cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTAxMTIsImV4cCI6MjA4MTkyNjExMn0.7eGpPAfDPKGIhYRR17yCxxMi1pRkKSTf7qxICZGcw0c',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWNqZmdldHRhdnppbGR1cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTAxMTIsImV4cCI6MjA4MTkyNjExMn0.7eGpPAfDPKGIhYRR17yCxxMi1pRkKSTf7qxICZGcw0c'
                },
                body: JSON.stringify(reaction)
            });
            
            // Remove from local DB after successful sync
            await deleteReaction(db, reaction.id);
        } catch (error) {
            console.error('Failed to sync reaction:', error);
        }
    }
}

// Sync comments to server
async function syncComments() {
    const db = await openCommentsDB();
    const comments = await getAllComments(db);
    
    for (const comment of comments) {
        try {
            await fetch('https://cmicjfgettavzilduqgq.supabase.co/rest/v1/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWNqZmdldHRhdnppbGR1cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTAxMTIsImV4cCI6MjA4MTkyNjExMn0.7eGpPAfDPKGIhYRR17yCxxMi1pRkKSTf7qxICZGcw0c',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaWNqZmdldHRhdnppbGR1cWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNTAxMTIsImV4cCI6MjA4MTkyNjExMn0.7eGpPAfDPKGIhYRR17yCxxMi1pRkKSTf7qxICZGcw0c'
                },
                body: JSON.stringify(comment)
            });
            
            await deleteComment(db, comment.id);
        } catch (error) {
            console.error('Failed to sync comment:', error);
        }
    }
}

// IndexedDB for offline reactions
function openReactionsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('astronomy-reactions', 1);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('reactions')) {
                db.createObjectStore('reactions', { keyPath: 'id' });
            }
        };
        
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function getAllReactions(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['reactions'], 'readonly');
        const store = transaction.objectStore('reactions');
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function deleteReaction(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['reactions'], 'readwrite');
        const store = transaction.objectStore('reactions');
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
    });
}

// IndexedDB for offline comments
function openCommentsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('astronomy-comments', 1);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('comments')) {
                db.createObjectStore('comments', { keyPath: 'id' });
            }
        };
        
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function getAllComments(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['comments'], 'readonly');
        const store = transaction.objectStore('comments');
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function deleteComment(db, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['comments'], 'readwrite');
        const store = transaction.objectStore('comments');
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject(event.target.error);
    });
}

// Push Notification Handler
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New astronomy update!',
        icon: '/assets/icons/icon-192x192.png',
        badge: '/assets/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/assets/icons/icon-72x72.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/icons/icon-72x72.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Astronomy News', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Do nothing
    } else {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Periodic Sync for background updates
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-news') {
        event.waitUntil(updateNewsBackground());
    }
});

async function updateNewsBackground() {
    try {
        const response = await fetch('/api/news/latest');
        const news = await response.json();
        
        // Cache new news
        const cache = await caches.open(DYNAMIC_CACHE);
        await cache.put('/api/news/latest', new Response(JSON.stringify(news)));
        
        // Show notification if there's new content
        if (news.length > 0) {
            await self.registration.showNotification('New Astronomy News', {
                body: `There are ${news.length} new articles available`,
                icon: '/assets/icons/icon-192x192.png',
                tag: 'news-update'
            });
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}