// Versioned PWA shell cache. NEVER cache portal, booking, SOS, or private responses.
const CACHE = "wayecho-shell-v5-public";
const SHELL = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];
const PRIVATE_PATH = /^\/(?:admin|internal|staff|partner|business|guide|my-booking|my-trip|notifications|login|booking|profile|sos|assistant|review|navigation)(?:\/|$)/;
const PRIVATE_SERVICE = /^\/services\/(?:ride-booking|guides)(?:\/|$)/;
const PUBLIC_OFFLINE_PAGES = new Set(["/", "/onboarding", "/help", "/accessibility"]);

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).catch(() => null));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.searchParams.has("_rsc")) return;
  if (PRIVATE_PATH.test(url.pathname) || PRIVATE_SERVICE.test(url.pathname)) return;

  if (request.mode === "navigate") {
    // Only public, non-personalized documents can be served offline.
    if (!PUBLIC_OFFLINE_PAGES.has(url.pathname) || url.search) return;
    event.respondWith(fetch(request).then(response => {
      if (response.ok && !/private|no-store/i.test(response.headers.get("cache-control") || "")) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)));
      }
      return response;
    }).catch(async () => (await caches.match(request)) || Response.error()));
    return;
  }

  const staticAsset = url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/assets/") || url.pathname.startsWith("/icons/");
  if (!staticAsset) return;
  event.respondWith(caches.match(request).then(async cached => {
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(request,copy)));
    }
    return response;
  }));
});
