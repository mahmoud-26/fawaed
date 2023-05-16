const fawaed = "fawaed"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/assets/images/logo.png",
  "/assets/fonts/Naskh.ttf",
  "/assets/fonts/NaskhB.ttf"
]
/*
self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(fawaed).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})
*/