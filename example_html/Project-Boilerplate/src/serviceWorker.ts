/// <reference lib="webworker" />
/*
 * Service worker thread to allow offline loading
 */
import { Const } from "./constants.js";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil((async () => {
        const cache: Cache = await caches.open(Const.appName);
        await cache.addAll([
            './app.html',
            './app.min.js',
            './yocto.svg'
        ]);
    })());
});

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith((async () => {
        const cache = await caches.open(Const.appName);
        // Gets the resource from the cache.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // If the resource was not in the cache, tries the network.
                const fetchResponse = await fetch(event.request);
                // Saves the resource in the cache and return it.
                await cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                return new Response('Network error', { status: 408 });
            }
        }
    })());
});
