// Solo recibe contactos compartidos (Web Share Target). No guarda nada para uso sin señal.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(clients.claim()); });

self.addEventListener('fetch', function (event) {
  var r = event.request;
  if (r.method !== 'POST' || !new URL(r.url).pathname.endsWith('/compartir')) return;
  event.respondWith((async function () {
    var cuerpo;
    try {
      var textos = [];
      var fd = await r.formData();
      for (var par of fd.entries()) if (typeof par[1] !== 'string') textos.push(await par[1].text());
      cuerpo = textos.join('\n');
    } catch (e) {
      cuerpo = JSON.stringify({ error: String(e) });
    }
    var c = await caches.open('contemplo-compartir');
    await c.put('./compartido.vcf', new Response(cuerpo));
    return Response.redirect('./?compartido=1', 303);
  })());
});
